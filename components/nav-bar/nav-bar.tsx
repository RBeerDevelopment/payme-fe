import { TextButton } from "@components/button/text-button";
import { UserIcon } from "@heroicons/react/solid";
import apolloClient from "apollo-client";
import { useAppContext } from "context/app-context/app-context";
import { useAuthContext } from "context/auth-context/auth-context";
import { useRouter } from "next/router";
import React from "react";


export function NavBar(): React.ReactElement {

    const router = useRouter();

    const { title } = useAppContext();

    const { user, logout } = useAuthContext();

    function handleProfileClick() {
        router.push("/profile");
    }

    function handleSignin() {
        router.push("/login");
    }

    function handleLogout() {
        apolloClient.clearStore();
        logout();
    }
    
    return (
        <div className="w-screen h-16 absolute top-0 z-50 flex flex-row justify-between items-center">
            <div className="text-4xl p-2 pl-4">{title}</div>
             
            <div className="flex flex-row items-center">
                {user &&
                <>
                    <UserIcon className="mr-6 w-7 h-7 text-black cursor-pointer" onClick={handleProfileClick} />
                    <div className="mr-6">
                        <TextButton onClick={handleLogout} marginY={4} >
                            Logout
                        </TextButton>
                    </div>
                </>
                }
                {!user && router.pathname !== "/login" && 
                    <div className="mr-6">
                        <TextButton onClick={handleSignin} marginY={4} marginX={4}>
                            Sign In
                        </TextButton>
                    </div>
                }
            </div>
        </ div>
    );
}