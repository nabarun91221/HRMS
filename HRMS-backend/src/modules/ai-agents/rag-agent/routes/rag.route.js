import Router from "express";
import verifyRequestJwt from "../../../../shared/middlewares/auth.middleware.js";
import validateDto from "../../../../shared/middlewares/dto.validation.middleware.js";
import RagController from "../controllers/rag.controller.js";
import askRagDto from "../dtos/askRag.dto.js";
import digestDocumentDto from "../dtos/digestDocument.dto.js";

const router = Router();

router.post(
  "/rag/ask",
  verifyRequestJwt,
  validateDto(askRagDto),
  RagController.generateAgentResponse,
);

router.post(
  "/rag/digest",
  verifyRequestJwt,
  validateDto(digestDocumentDto),
  RagController.digestDocument,
);

export default router;
