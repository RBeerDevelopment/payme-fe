import React from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";


interface Props {
    toggleDarkMode: () => void
}

export function DarkModeToggle(props: Props): React.ReactElement {

    const { toggleDarkMode } = props;

    return (
        <div>
            <a
                className="
                bg-gray-900
                dark:bg-gray-50
                fixed 
                p-4 
                md:right-12
                md:bottom-12
                right-6
                bottom-6
                w-14
                h-14
                rounded-full
                text-center
                cursor-pointer
                shadow-gray-700
                hover:shadow-xl
                hover:scale-105
                hover:shadow-gray-700
                shadow-lg"

                onClick={toggleDarkMode}
            >
                <div className="hidden dark:block">
                    <SunIcon className="text-gray-700" />
                </div>
                <div className="visible dark:hidden">
                    <MoonIcon className="text-gray-100" />
                </div>
            </a>
        </div>
    );
}
