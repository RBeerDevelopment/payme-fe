import { IconButton, TextOnlyButton } from "@components/button";
import React from "react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

interface Props<T> {
    subject: T
    onDelete: (subject: T) => void
    onEdit: (subject: T) => void

}

export function PaymentOptionBody<T>(props: Props<T>): React.ReactElement {

    const { subject, onDelete, onEdit } = props;
    return (
        <div className="m-2 flex flew-row justify-evenly">
            <TextOnlyButton text="Edit" textColor="text-gray-600" onClick={() => { onEdit(subject); }} />

            <TextOnlyButton text="Delete" textColor="text-red-600" onClick={() => { onDelete(subject); }} />
        </ div>
    );
}