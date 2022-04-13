import { IconButton } from "@components/icon-button/icon-button";
import React from "react";
import { CheckCircleIcon, TrashIcon, PencilAltIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { Payment } from "@graphql/payment/payment";

interface Props {
    payment: Payment
    onDelete: (payment: Payment) => void
    onEdit: (payment: Payment) => void
    onTogglePaid: (payment: Payment) => void

}

export function PaymentRequestBody(props: Props): React.ReactElement {

    const { payment, onDelete, onEdit, onTogglePaid } = props;
    return (
        <div className="m-2 flex flew-row justify-evenly">
            <IconButton text={payment.isPaid ? "Mark Unpaid" : "Mark Paid"} icon={payment.isPaid ? <MinusCircleIcon className="text-white" /> : <CheckCircleIcon className="text-white" />} bgColor="bg-gray-600" onClick={() => { onTogglePaid(payment); }} />
            <IconButton text="Edit" icon={<PencilAltIcon className="text-white" />} bgColor="bg-gray-700" onClick={() => { onEdit(payment); }} />
            <IconButton text="Delete" icon={<TrashIcon className="text-white" />} bgColor="bg-red-600" onClick={() => { onDelete(payment); }} />
        </ div>
    );
}