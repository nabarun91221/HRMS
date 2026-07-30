import ollama from "ollama";
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";
import DocumentEmbedding from "./models/documentEmbedding.model.js"
class RagDigestionPipeline
{
    #embedding_model = process.env.EMBEDDING_MODEL;
    #fileAcceptanceTypes = ["PDF"];
    #expectedFilePath = "src/modules/ai-agents/data";

    #embed = async (text, model) => 
    {
        model ??= process.env.EMBEDDING_MODEL || this.#embedding_model;
        if (!model) throw new Error("EMBEDDING_MODEL is not configured");

        const response =
            await ollama.embed({
                model,
                input: text
            });

        return response.embeddings[0];
    }
    #resolveFilePath = async (file_name) =>
    {
        const filePath = path.resolve(
            process.cwd(),
            this.#expectedFilePath,
            file_name
        );
        return filePath;
    }
    #parsePDF = async (path) =>
    {
        if (!fs.existsSync(path)) throw new Error("File not found");

        const data = new Uint8Array(
            fs.readFileSync(path)
        );

        const pdf = await pdfjs.getDocument({
            data
        }).promise;

        const documents = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

            const page = await pdf.getPage(pageNum);

            const content = await page.getTextContent();

            const text = content.items
                .map((item) => item.str)
                .join(" ");

            documents.push({
                content: text,
                metadata: {
                    source: path,
                    page: pageNum
                }
            });
        }

        return documents;
    }


    #recursiveChunk = async (document, size = 500, overlap = 100) =>
    {

        if (document.content.length <= size) {
            return [
                {
                    content: document.content,
                    metadata: {
                        ...document.metadata,
                        chunk: 0
                    }
                }
            ];
        }

        const separators = [
            "\n\n",
            "\n",
            ". ",
            " "
        ];

        for (const sep of separators) {

            const parts =
                document.content.split(sep);

            if (parts.length > 1) {

                const chunks = [];

                let current = "";
                let chunkIndex = 0;

                for (const part of parts) {

                    if (
                        current.length +
                        part.length >
                        size
                    ) {

                        chunks.push({
                            content: current,
                            metadata: {
                                ...document.metadata,
                                chunk: chunkIndex++
                            }
                        });

                        current = part + sep;
                    }
                    else {

                        current += part + sep;
                    }
                }

                if (current) {

                    chunks.push({
                        content: current,
                        metadata: {
                            ...document.metadata,
                            chunk: chunkIndex
                        }
                    });
                }

                return chunks;
            }
        }

        return [
            {
                content: document.content,
                metadata: {
                    ...document.metadata,
                    chunk: 0
                }
            }
        ];
    }

    digest = async (file_name, model) =>
    {
        try {
            const filePath = await this.#resolveFilePath(file_name);
            console.log(filePath);
            const ext = path.extname(filePath).toLowerCase();
            if (!this.#fileAcceptanceTypes.includes(ext.slice(1).toUpperCase())) throw new Error(`file type is not acceptable! sported types are: ${this.#fileAcceptanceTypes}`)
            let parsedPdfDocuments;
            let documentsChunks = [];
            switch (ext) {
                case ".pdf":
                    parsedPdfDocuments = await this.#parsePDF(filePath);
                    if (!parsedPdfDocuments || !parsedPdfDocuments.length) throw new Error("pdf parsing failed..");

                    for (const document of parsedPdfDocuments) {
                        const documentChunks = await this.#recursiveChunk(document);
                        if (documentChunks) documentsChunks.push(...documentChunks)
                    }
                    break;

                // case text:
                //     console.log("digesting text..");
                //     break;
            }

            const embeddings = await Promise.all(
                documentsChunks.map(async (chunk) =>
                {
                    const embedding = await this.#embed(chunk.content, model);
                    return {
                        ...chunk,
                        embedding
                    };
                })
            );

            const dbResponse = await DocumentEmbedding.insertMany(
                embeddings,
                {
                    ordered: false
                }
            )

            let response = {
                parsedDataLength:
                    parsedPdfDocuments.length,

                chunksLength:
                    documentsChunks.length,

                lastChunk:
                    documentsChunks.at(-1),

                embeddingsLength:
                    embeddings.length,

                lastEmbedding:
                    embeddings.at(-1),
                embeddingStorageResponse: { ...dbResponse }
            }

            return (response)

        } catch (error) {
            console.log(error);

        }
    }
    createEmbed = async (text) =>
    {
        const embed = await this.#embed(text);
        return embed;
    }

}

export default new RagDigestionPipeline();
