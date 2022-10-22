import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get('privateKey') as string;

export function signJsonWebToken(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}

export function decodeJsonWebToken(token: string) {
    try{
        //vérifie le token avec la clé privé
        const decoded = jwt.verify(token, privateKey);
        return { valid:true, expired: false, decoded };
    } catch (error: any) {
        return { 
            valid:false, 
            expired: error.message === "jwt expired", 
            decoded: null
        };
    }
}