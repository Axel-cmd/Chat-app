import { Router } from "express";
import { createSessionHandler } from "../controllers/session.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSessionSchema } from "../schemas/user.schema";

const router = Router();


router.post('/', validateRequest(createUserSessionSchema) ,createSessionHandler)

// router.get('/:sessionId')


export default router;