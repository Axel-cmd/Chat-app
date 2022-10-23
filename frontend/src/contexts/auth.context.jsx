import React, { useState, useContext } from "react";
import request, { authRequest } from "../utils/request";

const AuthContext = React.createContext(null);

export function AuthProvider({children}) {

    const [token, setToken] = useState(false);
    const [user, setUser] = useState({});

    const login = ({email, password}) => {
        // faire la fonction de connexion
        return new Promise( (resolve, reject) => {

            const body = {
                email,
                password
            }

            request({
                body,
                method: 'POST',
                url: '/sessions',
            })
            .then( res => res.json())
            .then( result => {

                if(result.accessToken && result.refreshToken) {
                    localStorage.setItem('accessToken', result.accessToken);
                    localStorage.setItem('refreshToken', result.refreshToken);
    
                    setToken(result);

                    authRequest({
                        method: 'GET',
                        url: '/users/current',
                    })
                    .then(res => res.json())
                    .then( result => {
                        setUser(result);
                    })


                    resolve();
                }else{
                    reject(result);
                }


            })
            .catch( err => reject(err))

            
        })
    }

    const logout = () => { 
        // fonction de déconnexion
        return new Promise((res) => {
            authRequest({
                method: 'DELETE',
                url: '/sessions'
            })
            .then( res => res.json() )
            .then(result => {
                setToken(false);
                setUser({});
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                res()
            })

        })
    }

    return <AuthContext.Provider value={{token, login, logout, setToken, user, setUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}