import React from "react";

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export function SectionTitle(props: Props): React.ReactElement {

    const { children } = props;
    return (
        <h2 className="text-3xl p-8 text-green-700 dark:text-green-700 text-center">
            {children}
        </ h2>
    );
}