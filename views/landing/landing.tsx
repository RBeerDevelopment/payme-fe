import React from "react";
import { SectionOptions } from "./section-options/section-options";
import { SectionWelcome } from "./section-welcome/section-welcome";

export function Landing(): React.ReactElement {

    
    return (
        <div className="h-full space-y-4">
            <SectionWelcome />
            <SectionOptions />
        </ div>
    );
}