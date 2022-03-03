import { useTranslation } from "next-i18next";
import React from "react";

interface Props {
    name: string
    type: string
    autocomplete?: string
    error: any
    hookFormSpread: object
}

export function LoginFormInput(props: Props): React.ReactElement {

    const {
        name,
        type,
        error,
        hookFormSpread,
        autocomplete
    } = props;

    const { t } = useTranslation("login");

    const inputClasses = "mt-1 focus:ring-green-700 focus:border-green-700 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";

    return (
        <div className="col-span-12">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-100">{t(`form-${name}`)}</label>
            {name === "message" ?
                <textarea name={name} id={name} autoComplete={autocomplete && autocomplete} className={inputClasses}
                    {...hookFormSpread}
                />
                :
                <input type={type} name={name} id={name} autoComplete={autocomplete && autocomplete} className={inputClasses}
                    {...hookFormSpread}
                />
            }
            {error && (
                <div className="text-normal text-red-500">
                    {t(error.message)}
                </div>
            )}
        </div>
    );
}