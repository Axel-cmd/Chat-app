import { object, string, ref, number, array } from "yup";

export const createUserSchema = object({
    body: object({
        username: string().required("Le nom d'utilisateur est requis"),
        friends: array(object({
            id: string().required(),
            username: string().required(), 
        })),
        conversations: array(string()),
        password: string()
            .required("Le mot de passe est requis ")
            .min(6, "Le mot de passe est trop court, il doit avoir au moins 6 caractères.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Le mot de passe doit contenir des lettres latines."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Les mots de passes doivent correspondre"
        ),
        email: string()
            .email("Doit être un email valide")
            .required("L'email est requis"),
    }),
})