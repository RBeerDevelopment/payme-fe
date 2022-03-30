import { SectionHeader, SectionLayout } from "@components/section";
import Image from "next/image";
import transferImage from "/public/images/transfermoney.svg";

import React from "react";


export function SectionWelcome(): React.ReactElement {

    const header = <SectionHeader 
        i18nKey="landing-welcome"
    />;

    const content = (
        <Image src={transferImage} layout="fill" />
    );
    
    return (
        <SectionLayout
            header={header}
            content={content}
            sectionId="welcome"
        />
    );
}