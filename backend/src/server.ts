import express from "express";
import config from "config"; 
import dbConnect from "./db/connect";

const PORT: number = config.get("port");
const HOST: string = config.get("host");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, HOST, async () => {
    console.log(`Server running at http://${HOST}:${PORT}`);

    // connexion à la bdd 
    dbConnect();


})