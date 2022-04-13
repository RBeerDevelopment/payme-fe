import React from "react";
import { EmptyFn } from "x";

interface Props {
    children:  string
    onClick:   EmptyFn
    bgColor?:  string
    marginX?:  number
    marginY?:  number
    paddingX?: number
    paddingY?: number
    width?:    string
    textColor?: string
}

export function TextButton(props: Props): React.ReactElement {

    const { 
        onClick, 
        children,
        bgColor = "green-500",
        marginX = 4,
        marginY = 0,
        paddingX = 4,
        paddingY = 2,
        width = "",
        textColor = "white"
    } = props;
    return (
        <button 
            className={`mx-${marginX} my-${marginY} bg-${bgColor} shadow-md hover:shadow-xl active:shadow-sm active:scale-95 hover:scale-105 text-${textColor} py-${paddingY} px-${paddingX} rounded-md ${width && `w-${width}`}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}