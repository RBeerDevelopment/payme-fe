import React from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface AccordionProps {
  title: React.ReactNode
  content: React.ReactNode
}

export const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
    const [active, setActive] = React.useState(false);
    const [height, setHeight] = React.useState("0px");
    const [rotate, setRotate] = React.useState("transform duration-700 ease");

    const contentSpace = React.useRef(null);

    function toggleAccordion() {

        const {scrollHeight} = contentSpace?.current || { scrollHeight: 0 }; 
        setActive(!active);
        setHeight(active ? "0px" : `${scrollHeight}px`);
        setRotate(active ? "transform duration-700 ease" : "transform duration-700 ease rotate-180");
    }

    return (
        <div className={"flex flex-col border-b border-b-gray-400"}>
            <button
                className="py-2 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
                onClick={toggleAccordion}
            >
                {title}
                <div className={`${rotate} inline-block text-black w-6 h-6`}>
                    <ChevronDownIcon  />
                </div >
            </button>
            <div
                ref={contentSpace}
                style={{ maxHeight: `${height}` }}
                className="overflow-auto transition-max-height duration-700 ease-in-out"
            >
                <div className="pb-10">{content}</div>
            </div>
        </div>
    );
};