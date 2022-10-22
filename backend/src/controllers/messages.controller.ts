import { Request, Response } from "express";
import { createMessages, findMessages } from "../services/messages.service";


export async function createMessagesHandler(req: Request, res: Response) {
    try {
        const messages = await createMessages(req.body);
        return res.send(messages.toJSON())
    } catch (error: any) {
        return res.sendStatus(404).send(error);
    }
}


export async function getMessagesHandler(req: Request, res: Response) {
    
    const conversationId = req.params.conversationId;

    const messages = await findMessages({ conversationId: conversationId})

    if(!messages) return res.sendStatus(404);

    return res.send(messages);
}