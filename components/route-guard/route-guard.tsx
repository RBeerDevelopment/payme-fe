import { useAuthContext } from "context/auth-context/auth-context";
import { useJwt } from "context/auth-context/use-jwt";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    children: React.ReactNode
}

export const publicPaths = ["/", "/login", "/account-created"];

export function RouteGuard(props: Props): React.ReactElement {
    
    const { children } = props;

    const { token, loading } = useAuthContext();

    const isTokenValid = useJwt(token);

    const { push, pathname } = useRouter();
    
    React.useEffect(() => {

        if(publicPaths.includes(pathname)) {
            return;
        }

        if(loading) {
            return;
        }

        if(token) {

            if(isTokenValid) {
                return;
            }

        }

        push("/login");

    }, [token]);

    return (
        <>
            {children}
        </>
    );
}