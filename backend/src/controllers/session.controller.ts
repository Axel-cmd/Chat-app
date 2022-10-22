import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { UserDocument } from "../models/user.model";
import { createAccessToken, createSession, findSession, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJsonWebToken } from "../utils/jwt.util";
import config from "config";
import { get } from "lodash";

export async function createSessionHandler(req: Request, res: Response) {

    const user = await validatePassword(req.body) as Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>;

    if(!user) return res.status(401).send("Email ou mot de passe invalide !");

    // créer une session
    // passer le user id  
    const session = await createSession(user._id, req.get("user-agent") || "");

    //créer un token d'accès 
    const accessToken = createAccessToken({
        user,
        session
    });

    // créer un refresh token 
    const refreshToken = signJsonWebToken(session, {
        expiresIn: config.get("refreshTokenTtl"),
    });

    // renvoyer les infos de l'utilisateur
    return res.send({accessToken, refreshToken});
}

/**
 * Récupérer les sessions d'un utilisateur 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getUserSessionsHandler(req: Request, res: Response) {
    // récupérer l'id de l'utilistateur
    const userId = get(req, "user._id"); 
    // rechercher les sessions en filtrant par l'utilisateur et validité des sessions
    const sessions = await findSession({user: userId, valid: true});
    // renvoyer les sessions
    return res.send(sessions);
}


/**
 * Désactiver la session d'un utilisateur 
 * @param req requête   
 * @param res response 
 * @returns retourne un null pour l'access token et le refresh token
 */
 export async function deleteSessionHandler(req: Request, res: Response) {
    // récupérer l'id de la 
    const sessionId = get(req, "user.session");
    // mettre à jour 
    await updateSession({ _id: sessionId}, {valid: false});

    // retourne un status 200 vu que l'utilisateur est déconnecté
    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
