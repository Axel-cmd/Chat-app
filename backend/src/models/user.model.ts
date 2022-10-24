import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { ConversationDocument } from "./conversation.model";


export interface UserDocument extends mongoose.Document {
    username: string,
    email: string,
    conversations: Array<ConversationDocument['_id']>,
    friends: Array<string>,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(passwordEntered: string): Promise<boolean>
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true},
        password:{type: String, required: true},
        conversations: { type: [mongoose.Schema.Types.ObjectId], ref: 'Conversation'},
        friends: { type: [mongoose.Schema.Types.ObjectId], ref: "Friend" }
    },
    {timestamps: true}
)

UserSchema.pre('save', async function (next) {
   //créer un nouvel utilisateur
   let user = this as UserDocument;
   //hasher le password uniquement si il a été modifié sinon on sort
   if(!user.isModified("password")) return next();

   // ajouté des données supplémentaire aléatoire 
   const salt: string = await bcrypt.genSalt(config.get("saltWorkFactor"));

   //création d'un hash
   const hash: string = bcrypt.hashSync(user.password, salt);

   //on stocke le hash dans le password 
   user.password = hash;

   return next();
})

// fonction de précharge lors de la mise 
UserSchema.pre("findOneAndUpdate", async function (this,next) {
    let update : any = {...this.getUpdate()};
    if (!update.password) return next();

    // ajouté des données supplémentaire aléatoire 
    const salt: string = await bcrypt.genSalt(config.get("saltWorkFactor"));

    //création d'un hash
    const hash: string = bcrypt.hashSync(update.password, salt);
    // mettre le hash dans le password update
    update.password = hash;
    // mettre à jour le update
    this.setUpdate(update);
})

/**
 * utilisé pour la connexion
 * @param passwordEntered le mot de passe à comparer 
 * @returns 
 */
 UserSchema.methods.comparePassword = async function(passwordEntered: string): Promise<boolean> {
    const user = this as UserDocument;

    //compare le mot de passe entré avec celui de l'utilisateur et renvoie un booleen
    return bcrypt.compare(passwordEntered, user.password).catch((e) => false);
}



const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;