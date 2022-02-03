import React from "react";

export function Footer() {
    return (
        <footer className='flex items-center justify-center w-full h-24 border-t dark:border-t-gray-900 bg-gray-100 dark:bg-gray-700'>
            <p className='text-md text-center text-gray-900 dark:text-gray-100'>
                Copyright ©{" "}
                <a className='text-md text-gray-900 dark:text-gray-100' href='https://robin.beer/'>
                    Robin Beer
                </a>
                <br />
                {new Date().getFullYear()}
                <br />
                <a href="https://robin.beer/imprint" className="text-blue-800 dark:text-white underline font-semibold">Imprint</a>
            </p>
        </footer>
    );
}
