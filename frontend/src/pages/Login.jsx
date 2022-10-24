import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { authRequest } from "../utils/request";

const Login = () => {

    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = () => {
        auth.login({email, password}).then( () => {
            setError(false)
            navigate("/home", {replace: true});
        })
        .catch(err => {
            setError(true)
            setEmail('');
            setPassword('')
        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if(accessToken && refreshToken){

            authRequest({
                url: '/sessions',
                method: 'GET'
            })
            .then(res => res.json())
            .then( result => {
                if(result.valid){
                    auth.setToken(true);
                    authRequest({
                        method: 'GET',
                        url: '/users/current',
                    })
                    .then(res => res.json())
                    .then( result => {
                        auth.setUser(result);
                        navigate("/home", {replace: true});
                    })
                }else{
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            })
        }

    }, [])


    return (
        <Container className="login-container">
            <Paper elevation={24} className="paper-container">
                <h2>Se connecter</h2>
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
                <Button variant="contained" onClick={handleLogin} >
                    Connexion
                </Button>
                <Button variant="contained" onClick={() => navigate('/register')} >
                    Créer un compte
                </Button>
                {error && (
                    <Typography style={{color: 'tomato'}} >Email ou mot de passe invalide !</Typography>
                )}
            </Paper>
        </Container>
    )
}

export default Login;