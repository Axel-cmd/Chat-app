import mongoose from "mongoose";
import { ConversationDocument } from "./conversation.model";


export interface Message extends mongoose.Document {
    content: string,
    author: ConversationDocument['_id'],
}

export const MessageSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        author: { type: mongoose.Schema.Types.ObjectId}
    }
)