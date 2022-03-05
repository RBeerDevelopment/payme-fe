import React from "react";

interface JWT {
    iss?: string
    sub?: string
    aud?: string
    exp?: number
    nbf?: number
    iat?: number
    jti?: string
}

export function useJwt(token: string | undefined): boolean {

    const isValid = React.useMemo(() => checkIsTokenValid(token), [token]);

    return isValid;
}

function checkIsTokenValid(token: string | undefined): boolean {
    if(!token) { 
        // set validity to true when no token is put in, as there can be problems otherwise
        return true;
    }
    
    try {

        const tokenContent = parseToken(token);
    

        if(!tokenContent) {
            return false;
        }
        return !isExpired(tokenContent);

    } catch(e: unknown) {
        return false;
    }
}

function parseToken(token: string): JWT {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    return JSON.parse(jsonPayload) as JWT;
}

function isExpired(token: JWT): boolean {
    if(!token.exp || !token.iat) return true;

    const nowInEpochSeconds = new Date().getTime() / 1000;

    return token.exp < nowInEpochSeconds || token.iat > nowInEpochSeconds;
}