import express from "express";
import config from "config"; 
import dbConnect from "./db/connect";
import { createServer } from "http";
import userRouter from "./routes/user.routes";
import sessionRouter from "./routes/session.routes";
import conversationsRouter from "./routes/conversations.routes";
import deserializeUser from "./middleware/deserializeUser";
import messagesRouter from './routes/messages.routes';
import cors from 'cors';

// récupérer les informations pour initialiser le serveur
const PORT: number = config.get("port");
const HOST: string = config.get("host");

const app = express();
const server = createServer(app);

app.use(deserializeUser);
app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({extended: false}));

// méthode pour la socket 

app.use('/users', userRouter);
app.use('/sessions', sessionRouter);
app.use('/conversations', conversationsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, HOST, async () => {
    console.log(`Server running at http://${HOST}:${PORT}`);

    // connexion à la bdd 
    dbConnect();
})