import { Router } from "express";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "../controllers/session.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createUserSessionSchema } from "../schemas/user.schema";

const router = Router();


router.post('/', validateRequest(createUserSessionSchema) ,createSessionHandler)


// GET /api/sessions/ 
router.get("/", requiresUser, getUserSessionsHandler);

// logout
//DELETE /api/session
router.delete("/", requiresUser, deleteSessionHandler);

export default router;