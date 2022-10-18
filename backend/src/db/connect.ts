import mongoose, { Mongoose } from "mongoose";
import config from "config";

function dbConnect(): Promise<void> {
    const dbUri: string = config.get("dbUri") as string;

    return mongoose
        .connect(dbUri)
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log("db error",error);
            process.exit(1)
        })
}

export default dbConnect;