import { CheckCircleIcon, DotsCircleHorizontalIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { ListItemStatus } from "./list-item-status";

interface Props {
    text: string
    status: ListItemStatus
}

export function StatusListItem(props: Props): React.ReactElement {

    const { text , status } = props;

    const icon = selectStatusIcon(status);

    return (
        <li>
            {icon} 
            {text}
        </li>
    );
}

function selectStatusIcon(status: ListItemStatus): React.ReactElement {
    if(status === ListItemStatus.Done) {
        return <CheckCircleIcon className="text-green-600 inline h-8 aspect-square mr-2 -mt-1" />;
    }
    if(status === ListItemStatus.InProgress) {
        return <DotsCircleHorizontalIcon className="text-blue-700 inline mr-2 h-8 aspect-square -mt-1" />;
    }
    return <XCircleIcon className="text-red-500 inline h-8 mr-2 aspect-square -mt-1"/>;

}