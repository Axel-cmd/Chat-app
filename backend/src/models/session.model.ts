import mongoose from "mongoose";
import { UserDocument } from "./user.model";

//session document
export interface SessionDocument extends mongoose.Document{
    user: UserDocument["_id"], //référence l'id utilisateur
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date
}

const SessionSchema: mongoose.Schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        valid: { type: Boolean, default: true},
        userAgent: { type: String}
    },
    { timestamps: true}
)

const Session: mongoose.Model<any, {}, {}, {}> = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;