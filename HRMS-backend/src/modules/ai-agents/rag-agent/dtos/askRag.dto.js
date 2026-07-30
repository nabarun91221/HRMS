import Joi from "joi";

const askRagDto = Joi.object({
  question: Joi.string().trim().min(1).max(4000).required(),
  sessionId: Joi.string().trim().max(120).default("default"),
  includeMemory: Joi.boolean().default(true),
  memoryTtlSeconds: Joi.number().integer().min(60).max(86400).default(3600),
}).unknown(false);

export default askRagDto;
