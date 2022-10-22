import { Router } from "express";
import { createConversationsHandler, getConversationsHandler } from "../controllers/conversation.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createConversationSchema } from "../schemas/conversation.schema";

const router = Router();

router.post('/', [requiresUser, validateRequest(createConversationSchema)], createConversationsHandler)

// get conversations of connectedUser
router.get('/', requiresUser, getConversationsHandler);

export default router;