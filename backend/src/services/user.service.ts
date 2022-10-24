import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";
import { omit } from 'lodash'

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

/**
 * Modifier un utilisateur
 * @param query
 * @param update
 * @param options 
 * @returns 
 */
 export async function updateUser (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    return User.findOneAndUpdate(query, update , options);
}

/**
 * Supprime un utilisateur
 * @param query
 * @param options
 * @returns 
 */
export async function  deleteUser (query : FilterQuery<UserDocument>, options: QueryOptions) {
    return User.findOneAndDelete(query, options);
    
}


export async function validatePassword({email, password}: {email: UserDocument['email'], password: string}) {
    const user = await User.findOne({email});
    if(!user) return false;

    const isValid = await user.comparePassword(password);
    if(!isValid) return false;

    return omit(user.toJSON(), "password");
}