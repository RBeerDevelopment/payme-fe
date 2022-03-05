import React from "react";

interface Props {
    label: string
    type: string
    name: string
    autocomplete?: string
    errorMessage: string
    hookFormSpread: object
}

export function FormHookInput(props: Props): React.ReactElement {

    const {
        name,
        label,
        type,
        errorMessage,
        hookFormSpread,
        autocomplete
    } = props;


    const inputClasses = "mt-1 focus:ring-green-700 focus:border-green-700 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";

    return (
        <div className="col-span-12">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-100">{label}</label>
            {name === "message" ?
                <textarea name={name} id={name} autoComplete={autocomplete && autocomplete} className={inputClasses}
                    {...hookFormSpread}
                />
                :
                <input type={type} name={name} id={name} autoComplete={autocomplete && autocomplete} className={inputClasses}
                    {...hookFormSpread}
                />
            }
            {errorMessage && (
                <div className="text-normal text-red-500">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}