import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";


// créer l'utilisateur 
export async function createUser(userInput: DocumentDefinition<UserDocument>): Promise<UserDocument> {
    try {
        return await User.create(userInput);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function findUsers() {
    return User.find().lean();
}