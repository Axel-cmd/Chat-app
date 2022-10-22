
import { get } from "lodash";
import { Request, Response, NextFunction} from "express";
import { decodeJsonWebToken } from "../utils/jwt.util";
import { reCreateAccessToken } from "../services/session.service";

const deserializeUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    console.log("request")

    //on récupère le token dans l'en-tête de la requête et on le met dans le headers.authorization
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );


    //header custom dans lequel on récupère le refreshtoken
    const refreshToken = get(req, "headers.x-refresh");

    //on retourne next s'il n'y a pas d'access token
    if(!accessToken) return next();

    //on essaye de décoder le token d'accès 
    const { decoded, expired } = decodeJsonWebToken(accessToken);

    //si il est décodé et que ca fait moins de 15min
    if(decoded) {
        // @ts-ignore 
        req.user = decoded;//on ajoute le token décodé dans l'objet user

        return next();
    }

    //si le token est expiré et qu'il y a un refresh token 
    if(expired && refreshToken) {  
        // recréer un access token
        const newAccessToken= await reCreateAccessToken({ refreshToken });

        if(newAccessToken) {
            //on ajoute le token dans la réponse
            res.setHeader("x-access-token", newAccessToken);

            const { decoded } = decodeJsonWebToken(newAccessToken);

            //@ts-ignore
            req.user = decoded;
        } 

        return next();
    }

    return next();
}

export default deserializeUser;