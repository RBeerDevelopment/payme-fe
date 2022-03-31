import { IconButton } from "@components/icon-button/icon-button";
import { PaymentMethod } from "@graphql/payment-method";
import React from "react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

interface Props {
    paymentMethod: PaymentMethod
}

export function PaymentOptionBody(props: Props): React.ReactElement {

    const { paymentMethod } = props;
    return (
        <div className="m-2 flex flew-row justify-evenly">
            <IconButton text="Edit" icon={<PencilAltIcon className="text-white" />} bgColor="bg-gray-700" onClick={() => {return;}} />

            <IconButton text="Delete" icon={<TrashIcon className="text-white" />} bgColor="bg-red-600" onClick={() => {return;}} />
        </ div>
    );
}