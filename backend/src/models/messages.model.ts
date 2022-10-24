import mongoose, { Mongoose } from "mongoose";
import { ConversationDocument } from "./conversation.model";
import { UserDocument } from "./user.model";

export interface MessagesDocument extends mongoose.Document {
    content: string,
    author: UserDocument['_id'],
    conversationId: ConversationDocument['_id'],
    createdAt: Date,
    updatedAt: Date
}

export const MessagesSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, required: true},
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    },
    {timestamps: true}
)

const Messages = mongoose.model<MessagesDocument>("Messages", MessagesSchema);

export default Messages;