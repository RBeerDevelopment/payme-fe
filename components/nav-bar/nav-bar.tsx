import { TextButton } from "@components/text-button";
import { UserIcon } from "@heroicons/react/outline";
import apolloClient from "apollo-client";
import { useAuthContext } from "context/auth-context/auth-context";
import { useRouter } from "next/router";
import React from "react";


export function NavBar(): React.ReactElement {

    const router = useRouter();

    const { user, logout } = useAuthContext();

    function handleProfileClick() {
        router.push("/profile");
    }

    function handleLogout() {
        apolloClient.clearStore();
        logout();
    }
    
    return (
        <div className="w-screen h-16 fixed top-0 bg-green-500 shadow-2xl z-50 flex flex-row justify-between items-center">
            <h1 className="text-white text-3xl font-semibold ml-3">PayME</h1>
            {user && 
            <div className="flex flex-row items-center">
                <UserIcon className="mr-6 w-7 h-7 text-white cursor-pointer" onClick={handleProfileClick} />
                <div className="mr-6">
                    <TextButton bgColor="white" textColor="black" onClick={handleLogout} marginY={4} >
                    Logout
                    </TextButton>
                </div>
            </div>}
        </ div>
    );
}