import { EmptyFn } from "@components/text-button";
import React from "react";
import { SendState } from "./send-state";

interface Props {
    defaulText: string
    errorText:  string
    onClick:    EmptyFn
    state:      SendState
    marginX?:   number
    marginY?:   number
    paddingX?:  number
    paddingY?:  number
    width?:     string
}

enum ButtonColorClass {
    NoError = "bg-green-500 hover:bg-green-600 hover:scale-105 focus:ring-green-700",
    Error = "bg-red-500 hover:bg-red-600 focus:ring-red-500"
}

export function SendStateButton(props: Props): React.ReactElement {

    const { 
        onClick, 
        defaulText,
        errorText,
        state,
        marginX = 4,
        marginY = 0,
        paddingX = 4,
        paddingY = 2,
        width = "",
    } = props;

    let colorClasses: ButtonColorClass | undefined = ButtonColorClass.NoError;
    let content: React.ReactNode;

    switch (state) {
        case SendState.NotSend:
            content = defaulText;
            break;
        case SendState.Sending:
            content = (<svg className="animate-spin h-5 w-full text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>);
            break;
        case SendState.Error:
            content = errorText;
            colorClasses = ButtonColorClass.Error;
            break;
        case SendState.Success:
            content = (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
            break;
        default:
            break;
    }

    return (
        <button 
            className={`${colorClasses} mx-${marginX} my-${marginY} text-white shadow-md hover:shadow-xl hover:scale-105 py-${paddingY} px-${paddingX} rounded-md ${width && `w-${width}`}`}
            onClick={onClick}
        >
            {content}
        </button>
    );
}