import mongoose, { Mongoose } from "mongoose";
import { ConversationDocument } from "./conversation.model";
import { UserDocument } from "./user.model";

export interface Message {
    content: string,
    author: UserDocument['_id'],
    createdAt: Date,
    updatedAt: Date
}

const MessageSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    {timestamps: true}
)

export interface MessagesDocument extends mongoose.Document {
    messages: [Message],
    conversationId: ConversationDocument['_id'],
}

export const MessagesSchema = new mongoose.Schema(
    {
        messages: {type: [MessageSchema], required: true},
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    }
)

const Messages = mongoose.model<MessagesDocument>("Messages", MessagesSchema);

export default Messages;