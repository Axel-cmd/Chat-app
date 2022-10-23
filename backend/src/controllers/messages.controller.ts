import { Request, Response } from "express";
import { createMessages, findMessages, updateMessages } from "../services/messages.service";


export async function createMessagesHandler(req: Request, res: Response) {
    try {
        const messages = await findMessages({conversationId: req.body.conversationId});

        if(messages){
            // @ts-ignore
            messages.messages.push({ author: req.body.author, content: req.body.content })

            const newMessages = await updateMessages({conversationId: req.body.conversationId}, messages);

            // si la collection existe on ajoute 
            return res.send(newMessages);

        } 
        else 
        {
            req.body = {
                conversationId: req.body.conversationId,
                messages: {
                    content: req.body.content,
                    author: req.body.author
                }
            }
            // sinon on crée
            const messages = await createMessages(req.body);

            return res.send(messages.toJSON());
        }

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