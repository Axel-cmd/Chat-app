import mongoose from "mongoose";
import { Message, MessageSchema } from "./message.model";
import { UserDocument } from "./user.model";


export interface ConversationDocument extends mongoose.Document {
    participants: Array<UserDocument["_id"]>
    messages: Array<Message>,
    createdAt: Date,
    updatedAt: Date,
}

const ConversationSchema: mongoose.Schema = new mongoose.Schema( 
    {
        participants: {type: [mongoose.Schema.Types.ObjectId], ref: "User", required: true},
        messages: {type: [MessageSchema], ref: "Messages"}
    }
)

const Conversation = mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;