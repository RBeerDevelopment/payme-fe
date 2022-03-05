import { User } from "@graphql/user";
import React from "react";
import { AuthContext } from "./auth-context";

interface Props {
    children: React.ReactNode
}

const tokenKey = "token";
const userKey = "user";

export function AuthProvider(props: Props): React.ReactElement {

    const { children } = props;

    const [user, setUser] = React.useState<User | undefined>();
    const [token, setToken] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(true);

    function login(newUser: User, newToken: string) {
        setUser(newUser);
        setToken(newToken);
    }
    
    function logout() {
        setUser(undefined);
        setToken(undefined);
    }

    const value = {
        user,
        token,
        loading,
        login,
        logout
    };

    React.useEffect(() => {
        if (localStorage.getItem(tokenKey)) { 
        
            const userLocalStorage = JSON.parse(localStorage.getItem(userKey) || "0");
            const tokenLocalStorage = localStorage.getItem(tokenKey) || undefined; 

            setUser(userLocalStorage);
            setToken(tokenLocalStorage);
        }

        setLoading(false);
    }, []);

    React.useEffect(() => {
        if(user && token ) {
            localStorage.setItem(tokenKey, token);
            localStorage.setItem(userKey, JSON.stringify(user));
            return;
        }

        localStorage.removeItem(userKey);
        localStorage.removeItem(tokenKey);

        setLoading(false);

    }, [user, token]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </ AuthContext.Provider>
    );
}