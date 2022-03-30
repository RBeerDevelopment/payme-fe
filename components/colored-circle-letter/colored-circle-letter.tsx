import React from "react";

interface Props {
    letter: string
    color: string
}

export function ColoredCircleLetter(props: Props): React.ReactElement {

    const { letter, color } = props;
    
    const colorClass = `bg-${color}`;

    return (
        <div className={`h-8 w-8 ${colorClass} rounded-full flex justify-center items-center`}>
            <p className="text-white font-bold text-xl">{letter}</p>
        </div>
    );
}