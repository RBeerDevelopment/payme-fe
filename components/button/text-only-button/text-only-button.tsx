import React from "react";
import { EmptyFn } from "x";

interface Props {
    text:      string
    onClick:   EmptyFn
    marginX?:  number
    marginY?:  number
    paddingX?: number
    paddingY?: number
    width?:    string
    textColor?: string
}

export function TextOnlyButton(props: Props): React.ReactElement {

    const { 
        onClick, 
        text,
        textColor = "text-black",
        marginX = 4,
        marginY = 0,
        paddingX = 4,
        paddingY = 2,
        width = "",
    } = props;
    return (
        <button 
            className={`mx-${marginX} uppercase font-bold bg-transparent text-lg my-${marginY} ${textColor} hover:bg-gray-200 py-${paddingY} px-${paddingX} rounded-md  ${width && `w-${width}`}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}