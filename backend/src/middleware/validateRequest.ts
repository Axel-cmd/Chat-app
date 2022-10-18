//middleware pour valider une requête 

import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

//o n'initialise la fonction avec le param schéma mais on ne l'execute pas tant que les autres params ne sont pas passés
const validateRequest =  (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        //on vérifie le schéma et s'il est bon on lance la fonction next
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
        
    } catch (error: any) {
        console.error(error);
        return res.status(400).send(error.errors);
        
    }
}

export default validateRequest;