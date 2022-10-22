import mongoose from "mongoose";
import { ConversationDocument } from "./conversation.model";


export interface Message extends mongoose.Document {
    content: string,
    author: ConversationDocument['_id'],
    createdAt: Date,
    updatedAt: Date
}

export const MessageSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        author: { type: mongoose.Schema.Types.ObjectId}
    },
    {timestamps: true}
)