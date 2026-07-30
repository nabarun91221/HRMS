import ollama from "ollama";
import DigestionPipeline from "./digestion.pipeline.js";
import DocumentEmbedding from "./models/documentEmbedding.model.js";
class RagRetrievalPipeline
{
    #ollamaChatModel = process.env.OLLAMA_CHAT_MODEL;
    #getChatModel = () =>
    {
        const model = process.env.OLLAMA_CHAT_MODEL || this.#ollamaChatModel;
        if (!model) throw new Error("OLLAMA_CHAT_MODEL is not configured");
        return model;
    }
    #createVectorRetrievalQuery = (queryEmbedding) => [
        {
            $vectorSearch: {

                index:
                    "vector_index",

                path:
                    "embedding",

                queryVector:
                    queryEmbedding,

                numCandidates:
                    100,

                limit:
                    5
            }
        },

        {
            $project: {

                content: 1,

                metadata: 1,

                score: {
                    $meta:
                        "vectorSearchScore"
                }
            }
        }
    ]
    #RESPONSE_SCHEMA = {

        type: "object",

        properties: {

            answer: {
                type: "string"
            },

            confidence: {
                type: "number"
            },

            sources: {
                type: "array",

                items: {
                    type: "object",

                    properties: {

                        source: {
                            type: "string"
                        },

                        page: {
                            type: "number"
                        },

                        chunk: {
                            type: "number"
                        }
                    }
                }
            },

        },

        required: [
            "answer",
            "confidence",
            "sources",
        ]
    };

    retrieve = async (stringQuery) =>
    {
        try {
            const embeddedQuery = await DigestionPipeline.createEmbed(stringQuery);
            const query = this.#createVectorRetrievalQuery(embeddedQuery);

            const vectorSearchResult = await DocumentEmbedding.aggregate(query);
            return vectorSearchResult;

        } catch (error) {
            console.log(error?.message)
            throw error;
        }

    }

    #createPrompt = (
        question,
        documents,
        memoryMessages = []
    ) =>
    {

        const context = documents.map(doc => `
                    SOURCE:${doc.metadata.source}
                    PAGE:${doc.metadata.page}
                    CHUNK:${doc.metadata.chunk}
                    CONTENT:${doc.content}`).join("\n");
        const memoryContext = memoryMessages
            .map(message => `${message.role.toUpperCase()}: ${message.content}`)
            .join("\n");

        return `
You are an expert documentation assistant.

RULES:

1. Answer ONLY using the provided context.
2. Never hallucinate.
3. If the answer is unavailable,
   say:
   "I could not find the answer."
4. Cite every source used.
5. Return ONLY valid JSON.
6. Use conversation memory only to understand follow-up questions. Do not use memory as a factual source.

Conversation memory:

${memoryContext || "No previous conversation memory."}

Context:

${context}

Question:

${question}

Return JSON:

{
  "answer": "",
  "confidence": 0.0,
  "sources": [],
  "followup_questions": []
}
`;
    }

    generate = async (question, documents) =>
    {

        const prompt =
            this.#createPrompt(
                question,
                documents
            );

        const response =
            await ollama.chat({

                model:
                    this.#getChatModel(),

                format:
                    this.#RESPONSE_SCHEMA,
                messages: [
                    {
                        role:
                            "user",

                        content:
                            prompt
                    }
                ],
                options: {

                    temperature:
                        0.1,

                    top_p:
                        0.9
                }
            });

        return JSON.parse(
            response.message.content
        );
    }

    generateWithMemory = async (question, documents, memoryMessages = []) =>
    {

        const prompt =
            this.#createPrompt(
                question,
                documents,
                memoryMessages
            );

        const response =
            await ollama.chat({

                model:
                    this.#getChatModel(),

                format:
                    this.#RESPONSE_SCHEMA,
                messages: [
                    {
                        role:
                            "user",

                        content:
                            prompt
                    }
                ],
                options: {

                    temperature:
                        0.1,

                    top_p:
                        0.9
                }
            });

        return JSON.parse(
            response.message.content
        );
    }
}

export default new RagRetrievalPipeline();
