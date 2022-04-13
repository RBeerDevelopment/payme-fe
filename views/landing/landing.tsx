import React from "react";
import { SectionOptions, SectionWelcome } from "./sections";

export function Landing(): React.ReactElement {

    
    return (
        <div className="h-full space-y-4">
            <SectionWelcome />
            <SectionOptions />
        </ div>
    );
}