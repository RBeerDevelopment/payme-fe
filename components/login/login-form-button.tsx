import { useTranslation } from "next-i18next";
import React from "react";
import { SendState } from "./send-state";

interface Props {
    state: SendState
    handleClick: () => void
}

enum ButtonColorClass {
    NoError = "bg-green-700 hover:bg-green-800 focus:ring-green-700",
    Error = "bg-red-500 hover:bg-red-600 focus:ring-red-500"
}

export function LoginFormButton(props: Props): React.ReactElement {

    const { state, handleClick } = props;

    const { t } = useTranslation("login");

    let content: React.ReactNode;
    let colorClasses: ButtonColorClass | undefined;

    switch (state) {
        case SendState.NotSend:
            content = t("form-button-signin");
            colorClasses = ButtonColorClass.NoError;
            break;
        case SendState.Sending:
            content = (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>);
            colorClasses = ButtonColorClass.NoError;
            break;
        case SendState.Error:
            content = t("form-button-error");
            colorClasses = ButtonColorClass.Error;
            break;
        default:
            break;
    }

    return (
        <div className="w-full flex justify-center">
            <button onClick={handleClick} className={`group w-1/2 md:1/3 flex justify-center py-2 px-4 my-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses}`}>
                {content}
            </button>
        </div>
    );
}