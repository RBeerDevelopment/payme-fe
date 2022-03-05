import { DarkModeToggle } from "@components/dark-mode-toggle/dark-mode-toggle";
import { Footer } from "@components/footer";
import { LanguageToggle } from "@components/language-toggle/language-toggle";
import React, { ReactElement } from "react";
import { NavBar } from "@components/nav-bar";

interface Props {
    children:   ReactElement | ReactElement[]
}

export function Layout(props: Props): React.ReactElement {

    const { children } = props;

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



    return (
        <main>
            <div className="min-h-screen w-screen overflow-x-hidden bg-gray-200 flex flex-1 justify-between flex-col">
                <NavBar />
                {children}
                <Footer />
            </ div>
            <DarkModeToggle toggleDarkMode={toggleDarkMode} />
            <LanguageToggle />
        </ main>
    );
}