import mongoose from "mongoose";
import { Message, MessageSchema } from "./message.model";
import { UserDocument } from "./user.model";


export interface ConversationDocument extends mongoose.Document {
    members: Array<UserDocument["_id"]>
    createdAt: Date,
    updatedAt: Date,
}

const ConversationSchema: mongoose.Schema = new mongoose.Schema( 
    {
        members: {type: [mongoose.Schema.Types.ObjectId], ref: "User", required: true},
    }
)

const Conversation = mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;