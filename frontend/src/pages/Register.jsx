import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import request from "../utils/request";
import { useNavigate } from "react-router-dom";

const Register = ( ) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(false);

    const handleRegister = () => {
        request({
            url: '/users',
            method: 'POST',
            body: {
                username,
                email,
                password,
                passwordConfirmation
            }
        })
        .then( res => res.json())
        .then( result => {
            console.log(result);
            navigate('/login');
        })
        .catch( err => {
            console.log(err);
            setError(true)
        })
    }

    return (
        <Container className="login-container">
            <Paper elevation={24} className="paper-container">
                <h2>Créer un compte</h2>
                <TextField
                    className="form-textfield"
                    id="outlined-multiline-flexible"
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    className="form-textfield"
                    id="outlined-multiline-flexible"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className="form-textfield"
                    id="outlined-multiline-flexible"
                    label="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    className="form-textfield"
                    id="outlined-multiline-flexible"
                    label="Mot de passe"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <Button variant="contained" onClick={handleRegister} >
                    Créer le compte
                </Button>
                <Button variant="contained" onClick={() => navigate('/login')} >
                    Retour
                </Button>
                {error && (
                    <Typography style={{color: 'tomato'}} >Problème lors de la création du compte!</Typography>
                )}
            </Paper>
        </Container>
    )
}

export default Register;