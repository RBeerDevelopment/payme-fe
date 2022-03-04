import { AddPaymentTypeButton } from "@components/add-payment-type-button/add-payment-type-button";
import { Sepa } from "@graphql/sepa/sepa";
import React from "react";
import { AddSepaModal } from "./add-sepa-modal";

interface Props {
    sepaList?: Sepa[]
}

export function SepaProfileCard(props: Props): React.ReactElement {

    const { sepaList } = props;
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className="flex flex-col p-8 pt-2 m-4 bg-white rounded-md shadow-xl shadow-gray-400">
                <p className="text-3xl my-4">Sepa</p>
                {/* add list of existing sepas here */}
                <div className="flex justify-center w-full">
                    <AddPaymentTypeButton text="Add Sepa" onClick={() => { setShowModal(true); }}/>
                </div>
            </ div>
            <AddSepaModal hideModal={() => { setShowModal(false); }} show={showModal} />
        </>
    );
}