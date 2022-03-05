import React from "react";
import { AuthState, defaultAuthState } from "./auth-state";


export const AuthContext = React.createContext<AuthState>(defaultAuthState);

export function useAuthContext(): AuthState {
    return React.useContext(AuthContext);
}