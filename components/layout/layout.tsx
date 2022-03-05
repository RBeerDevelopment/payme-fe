import { DarkModeToggle } from "@components/dark-mode-toggle/dark-mode-toggle";
import { Footer } from "@components/footer";
import { LanguageToggle } from "@components/language-toggle/language-toggle";
import { TextButton } from "@components/text-button";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

import apolloClient from "apollo-client";

interface Props {
    children:   ReactElement | ReactElement[]
    showLogout?: boolean
}

export function Layout(props: Props): React.ReactElement {

    const { children, showLogout = true } = props;
    const router = useRouter();

    const [isDarkMode, setDarkMode] = React.useState<boolean>(false);

    

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");

        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setDarkMode(!isDarkMode);
    }

    function handleLogout() {
        localStorage.clear();
        apolloClient.clearStore();
        router.push("/login");
    }


    return (
        <main>
            <div className="min-h-screen w-screen overflow-x-hidden bg-gray-200 flex flex-1 justify-between flex-col">
                {showLogout && <div className="fixed top-2 right-2">
                    <TextButton onClick={handleLogout} marginY={4} >
                    Logout
                    </TextButton>
                </div>}
                {children}
                <Footer />
            </ div>
            <DarkModeToggle toggleDarkMode={toggleDarkMode} />
            <LanguageToggle />
        </ main>
    );
}