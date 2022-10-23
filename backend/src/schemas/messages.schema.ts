import { array, object, string } from "yup";

export const createMessagesSchema = object({
    body: object({
        content: string().required('Il faut un contenu pour le message'),
        author: string().required('Il faut le créateur pour le message'),
        conversationId: string()
            .required("Il faut l'id de la conversation lié aux messages !")
    })
})