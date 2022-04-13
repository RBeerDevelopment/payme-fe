import { IconButton } from "@components/button";
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
            <IconButton text="Edit" icon={<PencilAltIcon className="text-white" />} bgColor="bg-gray-700" onClick={() => { onEdit(subject); }} />

            <IconButton text="Delete" icon={<TrashIcon className="text-white" />} bgColor="bg-red-600" onClick={() => { onDelete(subject); }} />
        </ div>
    );
}