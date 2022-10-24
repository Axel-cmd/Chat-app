import { Router } from "express";
import { getUsersHandler, createUserHandler, getCurrentUserHandler, updateUserHandler, deleteUserHandler } from "../controllers/user.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const router = Router();

// POST create user /users/
router.post("/", validateRequest(createUserSchema), createUserHandler)

router.get('/current', requiresUser, getCurrentUserHandler);

// GET one or many user(s) /users/:id
router.get("/:id?", requiresUser , getUsersHandler);

router.put("/:id", [requiresUser, validateRequest(updateUserSchema)], updateUserHandler);

router.delete("/:id", requiresUser, deleteUserHandler);


export default router;