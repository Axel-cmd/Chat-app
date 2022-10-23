import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const auth = useAuth();

    return auth.token ? children : <Navigate to="/login" replace  state={{path: location.pathname}} />
    
}

export default RequireAuth;