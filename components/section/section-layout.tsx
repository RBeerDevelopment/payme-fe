import React from "react";

interface Props {
    header: React.ReactNode,
    content: React.ReactNode,
    bottom?: React.ReactNode
    sectionId: string,
    inverseOrder?: boolean
    greenBackground?: boolean
}

export function SectionLayout(props: Props): React.ReactElement {

    const { 
        header, 
        content, 
        bottom, 
        sectionId, 
        inverseOrder = false, 
        greenBackground 
    } = props;

    return (
        <section className={`${greenBackground ? "bg-green-700" : "bg-gray-200 dark:bg-gray-700"} w-screen`} id={sectionId}>
            <div className={`container mx-auto flex items-start ${inverseOrder ? "flex-row-reverse" : "flex-row"} mt-12 mb-6 md:mt-24 md:mb-12`}>
                {header}
                <div className={`w-screen md:ml-0 md:${inverseOrder ? "mr-12" : "ml-12"} lg:w-2/3 sticky h-screen`}>
                    {content}
                </div>
            </div>
            {bottom && bottom}
        </ section>
    );
}