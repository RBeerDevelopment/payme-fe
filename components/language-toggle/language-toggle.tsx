import { useRouter } from "next/router";
import React from "react";

import { GlobeAltIcon } from "@heroicons/react/solid";


export function LanguageToggle(): React.ReactElement {

    const router = useRouter();


    function toggleLanguage() {
        switch (router.locale) {
            case "en":
                router.push("", "", { locale: "de", scroll: false });
                break;
            case "de":
                router.push("/en", "/en", { locale: "en", scroll: false });
                break;
            default:
                break;
        }
    }

    return (
        <a
            className="
                bg-gray-900
                dark:bg-gray-50
                fixed 
                p-2
                md:right-14
                md:bottom-28
                right-8
                bottom-24
                w-10
                h-10
                rounded-full
                text-center
                cursor-pointer
                shadow-gray-700
                hover:shadow-xl
                hover:scale-105
                hover:shadow-gray-700
                shadow-lg"
            onClick={toggleLanguage}
        >
            <GlobeAltIcon className="text-white dark:text-gray-900" />
        </a>
    );
}