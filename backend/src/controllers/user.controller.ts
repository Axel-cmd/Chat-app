import { Request, Response } from "express";
import { omit, get } from "lodash";
import { createUser, deleteUser, findUser, findUsers, updateUser } from "../services/user.service";



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
        const user = await findUser({_id: userId});
        users.push(user);
    }
    else {
        users = await findUsers();
    }
    if(!users.length) return res.sendStatus(404);
    return res.send(users.map(user => omit(user, "password")));
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    
    const currentUserId = get(req, 'user._id');

    const user = await findUser({_id: currentUserId});

    if(!user) return res.sendStatus(404);

    return res.send(user);
}

export async function updateUserHandler (req : Request, res: Response) {

    //récupérer l'Id de l'utilisateur
    const userId = get(req, "user._id");

    //récupérer le contenu a modifié
    const update = req.body;
    
    // modifier les informations de l'utilisateur puis récupérer les nouvelles informations
    const user = await updateUser({_id: userId}, update, {new: true}); // new permet récupérer les dernières informations

    //vérification de l'utilisateur 
    if (!user) return res.sendStatus(404);
    return res.send(omit(user.toJSON(), "password"));
}

export async function  deleteUserHandler (req : Request, res : Response) {
    //récuper l'Id de l'utilisateur
    const userId = get(req, "user._id");

    //Suppresion de l'utilisateur
    await deleteUser ({_id: userId}, {});

    return res.sendStatus(200);
    
}