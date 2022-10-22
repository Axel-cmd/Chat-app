import { Router } from "express";
import { getUsersHandler, createUserHandler } from "../controllers/user.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

// POST create user /users/
router.post("/", validateRequest(createUserSchema), createUserHandler)

// GET one or many user(s) /users/:id
router.get("/:id?", requiresUser , getUsersHandler);

// router.put("/:id")

// router.delete("/users")


export default router;