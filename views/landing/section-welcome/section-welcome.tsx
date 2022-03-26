import { SectionHeader, SectionLayout } from "@components/section";
import Image from "next/image";

import React from "react";


export function SectionWelcome(): React.ReactElement {

    const header = <SectionHeader 
        i18nKey="landing-welcome"
    />;

    const content = (
        <Image src="/images/undraw_transfer_money.svg" layout="fill" />
    );
    
    return (
        <SectionLayout
            header={header}
            content={content}
            sectionId="welcome"
        />
    );
}