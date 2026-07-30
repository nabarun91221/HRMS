import DigestionPipeline from "../digestion.pipeline.js";
import AiTemporaryMemory from "../models/aiTemporaryMemory.model.js";
import RetrievalPipeline from "../retrieval.pipeline.js";

class RagController
{
    #getUserId = (req) =>
    {
        return req.user?.sub || req.user?.id;
    }

    #getMemory = async (userId, sessionId, limit = 10) =>
    {
        const memory = await AiTemporaryMemory.find({
            userId,
            sessionId,
            expiresAt: {
                $gt: new Date()
            }
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return memory.reverse().map(message => ({
            role: message.role,
            content: message.content
        }));
    }

    #storeMemory = async (userId, sessionId, question, answer, ttlSeconds) =>
    {
        const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

        await AiTemporaryMemory.insertMany([
            {
                userId,
                sessionId,
                role: "user",
                content: question,
                expiresAt
            },
            {
                userId,
                sessionId,
                role: "assistant",
                content: answer,
                expiresAt
            }
        ]);
    }

    generateAgentResponse = async (req, res) =>
    {
        try {
            const {
                question,
                sessionId,
                includeMemory,
                memoryTtlSeconds
            } = req.body;
            const userId = this.#getUserId(req);

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authenticated user not found"
                });
            }

            const memory = includeMemory
                ? await this.#getMemory(userId, sessionId)
                : [];
            const retrievedDocuments = await RetrievalPipeline.retrieve(question);
            const agentResponse = await RetrievalPipeline.generateWithMemory(
                question,
                retrievedDocuments,
                memory
            );

            await this.#storeMemory(
                userId,
                sessionId,
                question,
                agentResponse.answer,
                memoryTtlSeconds
            );

            return res.status(200).json({
                success: true,
                data: {
                    ...agentResponse,
                    memory: {
                        sessionId,
                        ttlSeconds: memoryTtlSeconds
                    }
                }
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

    }

    digestDocument = async (req, res) =>
    {
        try {
            const { fileName, model } = req.body;
            const response = await DigestionPipeline.digest(fileName, model);

            return res.status(201).json({
                success: true,
                data: response
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new RagController()
