import { Request, Response } from "express";
import { createConversation, findConversations } from "../services/conversations.service";
import { get } from 'lodash';

/**
 * Service pour créer une conversation
 * @param req 
 * @param res 
 * @returns 
 */
export async function createConversationsHandler(req: Request, res: Response) {
    try {
        const conversation = await createConversation(req.body)
        return res.send(conversation.toJSON())

    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}

export async function getConversationsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const conversations = await findConversations({members: userId});

    return res.send(conversations);
}