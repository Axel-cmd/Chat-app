import { Router } from "express";
import { createMessagesHandler, getMessagesHandler } from "../controllers/messages.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createMessagesSchema } from "../schemas/messages.schema";

const router = Router();

router.post("/", [requiresUser, validateRequest(createMessagesSchema)], createMessagesHandler)

// Récupérer tout les messages d'une conversation
router.get("/:conversationId", [requiresUser], getMessagesHandler);

export default router;