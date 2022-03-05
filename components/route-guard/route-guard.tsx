import { useAuthContext } from "context/auth-context/auth-context";
import { useJwt } from "context/auth-context/use-jwt";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    children: React.ReactNode
}

export function RouteGuard(props: Props): React.ReactElement {
    
    const { children } = props;

    const { token, loading } = useAuthContext();

    const isTokenValid = useJwt(token);

    const { push, pathname } = useRouter();
    
    React.useEffect(() => {

        console.log({ token, loading, isTokenValid });

        if(pathname === "/login") {
            return;
        }

        if(loading) {
            return;
        }

        if(token) {

            console.log("tokenExists", { isTokenValid });


            if(isTokenValid) {
                return;
            }

            push("/login");
        }

        push("/login");

    }, [token]);

    return (
        <>
            {children}
        </>
    );
}