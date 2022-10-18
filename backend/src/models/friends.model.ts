import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface FriendDocument extends mongoose.Document {
    friendId: UserDocument['_id'],
    username: UserDocument['username'],
    createdAt: Date,
    updatedAt: Date
}

export const FriendSchema: mongoose.Schema = new mongoose.Schema(
    {
        friendId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: { type: String }
    },
    {timestamps: true}
)
