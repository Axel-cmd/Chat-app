import { Router } from "express";
import { createConversationsHandler, getConversationsHandler } from "../controllers/conversation.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createConversationSchema } from "../schemas/conversation.schema";

const router = Router();

// créer une nouvelle conversation 
router.post('/', [requiresUser, validateRequest(createConversationSchema)], createConversationsHandler)

// récupérer les conversation de l'utilisateur connecté 
router.get('/', requiresUser, getConversationsHandler);

export default router;