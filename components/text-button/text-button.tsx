import React from "react";
import { EmptyFn } from "./empty-fn";

interface Props {
    children:  string
    onClick:   EmptyFn
    bgColor?:  string
    marginX?:  number
    marginY?:  number
    paddingX?: number
    paddingY?: number
    width?:    string
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
        width = ""
    } = props;
    return (
        <button 
            className={`mx-${marginX} my-${marginY} bg-${bgColor} shadow-md hover:shadow-xl hover:scale-105 text-white py-${paddingY} px-${paddingX} rounded-md ${width && `w-${width}`}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}