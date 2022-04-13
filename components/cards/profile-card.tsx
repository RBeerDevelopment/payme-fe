import React from "react";

interface Props {
    title?: string,
    children: React.ReactNode
}

export function ProfileCard(props: Props): React.ReactElement {

    const { title, children } = props;

    return (
        <div className="flex flex-col p-8 pt-2 m-4 bg-white rounded-md shadow-xl shadow-gray-400">
            {title && <p className="text-2xl my-4">{title}</p>}
            {children}
        </div>
    );
}