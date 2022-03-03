import React from "react";

import { Footer } from "@components/footer";
import { DarkModeToggle } from "@components/dark-mode-toggle/dark-mode-toggle";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LanguageToggle } from "@components/language-toggle/language-toggle";

export default function Home(): React.ReactElement {

    const [isDarkMode, setDarkMode] = React.useState<boolean>(true);

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
        <div className="min-h-screen w-screen overflow-x-hidden">
            <main className='flex justify-center items-center flex-col'>
                <p className="text-lg">Test</p>
            </main>
            <Footer />
            <DarkModeToggle toggleDarkMode={toggleDarkMode} />
            <LanguageToggle />
        </div>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
