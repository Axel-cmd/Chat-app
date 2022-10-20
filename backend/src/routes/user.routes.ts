import { Request, Response, Router } from "express";
import { getUsersHandler, createUserHandler } from "../controllers/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

/********CRUD USER ********/  

router.get("/:id?", getUsersHandler);

router.post("/", validateRequest(createUserSchema), createUserHandler)

router.put("/:id", (req: Request, res: Response) => {
    
})

router.delete("/users", (req: Request, res: Response) => {
    
})


export default router;