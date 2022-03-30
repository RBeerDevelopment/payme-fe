import { SectionHeader, SectionLayout } from "@components/section";
import React from "react";
import { StatusListItem } from "@components/status-list/status-list-item";
import { ListItemStatus } from "@components/status-list/list-item-status";

export function SectionOptions(): React.ReactElement {

    const header = <SectionHeader 
        hasSubtitle={false}
        i18nKey="landing-options"
    />;

    const content = (
        <ul className="list-none p-0 m-auto space-y-4 font-semibold text-xl mt-32 ml-12 text-black">
            <StatusListItem text="PayPal" status={ListItemStatus.Done} />
            <StatusListItem text="Sepa Bank Transfer" status={ListItemStatus.Done} />
            <StatusListItem text="Creditcard (coming soon)" status={ListItemStatus.InProgress} />
            <StatusListItem text="Apple Pay (coming soon)" status={ListItemStatus.InProgress} />
            <StatusListItem text="Google Pay (coming soon)" status={ListItemStatus.InProgress} />
        </ul>
    );
    
    return (
        <SectionLayout
            header={header}
            content={content}
            sectionId="options"
            inverseOrder={true}
        />
    );
}