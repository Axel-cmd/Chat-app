import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { UserDocument } from "../models/user.model";
import { createAccessToken, createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJsonWebToken } from "../utils/jwt.util";
import config from "config";

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