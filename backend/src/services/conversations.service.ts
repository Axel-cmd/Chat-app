import { DocumentDefinition, FilterQuery } from "mongoose";
import Conversation, { ConversationDocument } from "../models/conversation.model";


export async function createConversation(userInput: DocumentDefinition<ConversationDocument>) {
    try {
        return Conversation.create(userInput);
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function findConversations(query: FilterQuery<ConversationDocument>) {
    return Conversation.find(query).lean();
}