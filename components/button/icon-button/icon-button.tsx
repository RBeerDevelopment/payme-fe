import { EmptyFn } from "x";
import React from "react";

interface Props {
    icon: React.ReactChild
    text: string
    bgColor: string
    onClick: EmptyFn
}

export function IconButton(props: Props): React.ReactElement {

    const { bgColor, icon, text, onClick } = props;
    return (
        <button 
            className={`${bgColor} text-white shadow-md flex flex-row hover:shadow-xl hover:scale-105 py-2 px-2 rounded-md`}
            onClick={onClick}
        >
            <div className="w-6 h-full flex flex-col justify-center mx-1">
                {icon}
            </div>
            <div className="mx-1">
                {text}
            </div>
        </button>
    );
}