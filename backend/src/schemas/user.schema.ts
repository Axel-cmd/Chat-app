import { object, string, ref, array } from "yup";

export const createUserSchema = object({
    body: object({
        username: string().required("Le nom d'utilisateur est requis"),
        friends: array(string()),
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


export const updateUserSchema = object({
    body: object({
        username: string(),
        friends: array(string()),
        conversations: array(string()),
        password: string()
            .min(6, "Le mot de passe est trop court, il doit avoir au moins 6 caractères.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Le mot de passe doit contenir des lettres latines."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Les mots de passes doivent correspondre"
        ),
        email: string()
            .email("Doit être un email valide"),
    }),
})

export const createUserSessionSchema = object({
    body: object({
        email: string()
            .required("L'email est requis")
            .email("Doit être un email valide"),
        password: string()
            .required("Un mot de passe est requis")
            .min(6, "Le mot de passe est trop court, il doit avoir au moins 6 caractères.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Le mot de passe doit contenir des lettres latines."),  
    })      
})