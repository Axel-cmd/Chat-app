import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { decodeJsonWebToken, signJsonWebToken } from "../utils/jwt.util";
import config from "config";
import { get } from "lodash"
import { findUser } from "./user.service";


/**
 * Créer une session pour un utilisateur 
 * @param userId 
 * @param userAgent 
 * @returns 
 */
 export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({user: userId, userAgent})

    return session.toJSON();
}


/**
 * Retrouver une session
 * @param query filtre pour retrouver la session
 * @returns 
 */
 export async function findSession(query: FilterQuery<SessionDocument>) {
    return Session.findOne(query).lean();
}

/**
 * Mettre à jour une session 
 * @param query filtre pour récupérer l'élément à modifier
 * @param update changement à apporter à l'élément
 * @returns 
 */
 export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return Session.updateOne(query, update);
}




/**
 * récupére en paramètre un utilisateur et une session sans prendre les password grâce à omit 
 * @param param0
 */
 export function createAccessToken({
    user,
    session,
}:  {
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>;
    session: 
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    //créer et retourner le nouveau token d'accès
    const accessToken = signJsonWebToken(
        { ...user, session: session._id},
        { expiresIn: config.get("accessTokenTtl")} //option d'expiration du token récupérer dans la config //15 minutes
    ) 

    return accessToken;
}

/**
 * Remettre un nouvelle access token 
 * @param param0 refreshToken
 * @returns 
 */
export async function reCreateAccessToken({refreshToken,}: {refreshToken: string}){
    
    const { decoded } = decodeJsonWebToken(refreshToken);

    //vérifié que le token a été décodé et que la session existe 
    if(!decoded || !get(decoded, "_id")) return false;

    //récupérer la session
    const session = await Session.findById(get(decoded, "_id"));

    //vérifié que la session est valide 
    if (!session || !session?.valid) return false;

    //chercher l'utilisateur 
    const user = await findUser({ _id: session.user });

    if(!user) return false;

    //créer un nouvel accessToken
    const accessToken = createAccessToken( {user, session });

    return accessToken;
}



