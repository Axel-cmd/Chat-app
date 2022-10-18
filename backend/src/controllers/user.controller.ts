import { Request, Response } from "express";
import { omit, get } from "lodash";
import { createUser, findUser, findUsers } from "../services/user.service";



/**
 * Service pour créer l'utilisateur 
 * @param req 
 * @param res 
 * @returns 
 */
export async function createUserHandler(req: Request, res: Response) {
    try {
        // créer un utilisateur 
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}

/**
 * Service pour récupérer un ou plusieurs utilisateurs
 * @param req 
 * @param res 
 * @returns 
 */
export async function getUsersHandler(req: Request, res: Response) {
    const userId = req.params.id;

    let users = [];

    if(userId) {
        console.log(userId)
        const user = await findUser({_id: userId});
        users.push(user);
    }
    else {
        users = await findUsers();
    }
    if(!users.length) return res.sendStatus(404);
    return res.send(users.map(user => omit(user, "password")));
}