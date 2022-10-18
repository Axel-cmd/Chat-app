import { Express, Request, Response } from "express";
import { createUserHandler, getUsersHandler } from "./controllers/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schemas/user.schema";

export default function (app: Express) {
    
    app.get('/', (req: Request, res: Response) => res.sendStatus(200));

    /********CRUD USER ********/  

    app.get("/users/:id?", getUsersHandler);

    app.post("/users", validateRequest(createUserSchema), createUserHandler)

    app.put("/users/:id", (req: Request, res: Response) => {
        
    })

    app.delete("/users", (req: Request, res: Response) => {
        
    })

    /****** SESSIONS ******/

    app.get("/sessions", (req: Request, res: Response) => {

    })

}