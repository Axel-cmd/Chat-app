import { object, string, array } from "yup";

export const createConversationSchema = object({
    body: object({
        members: array(string())
            .required('Il faut des membres pour une conversation')
            .min(2, "Il faut au minimum 2 membres"),        
    }),
})