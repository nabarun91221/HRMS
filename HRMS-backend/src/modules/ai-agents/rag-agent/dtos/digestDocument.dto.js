import Joi from "joi";

const digestDocumentDto = Joi.object({
  fileName: Joi.string().trim().min(1).required(),
  model: Joi.string().trim().optional(),
}).unknown(false);

export default digestDocumentDto;
