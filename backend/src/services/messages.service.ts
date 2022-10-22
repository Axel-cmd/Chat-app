import { DocumentDefinition, FilterQuery } from "mongoose";
import Messages, { MessagesDocument } from "../models/messages.model";


export async function createMessages(userInput: DocumentDefinition<MessagesDocument>) {
    try {
        return Messages.create(userInput)
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export async function findMessages(query: FilterQuery<MessagesDocument>) {
    return Messages.findOne(query).lean();
}
