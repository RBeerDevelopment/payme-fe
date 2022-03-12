import { User } from "../../../graphql";
import React from "react";
import { AddPaymentMethodModal } from "../add-payment-method-modal";
import { TextButton } from "@components/text-button";
import { PaymentMethod } from "./payment-method";
import { PaymentOptionSection } from "./payment-option-section";

interface Props {
    user?: User
}

export function PaymentMethodsProfileCard(props: Props): React.ReactElement {

    const { user } = props;
    const [showModal, setShowModal] = React.useState(false);

    console.log({ user });
    return (
        <>
            <div className="flex flex-col p-8 pt-2 m-4 bg-white rounded-md shadow-xl shadow-gray-400">
                <p className="text-2xl my-4">Payment Methods</p>
                <PaymentOptionSection paymentMethodType={PaymentMethod.PayPal} paymentMethods={user?.paypal || []} />
                <div className="flex justify-center w-full">
                    <TextButton onClick={() => setShowModal(true)}>Add</TextButton>
                </div>
            </ div>
            <AddPaymentMethodModal hideModal={() => { setShowModal(false); }} show={showModal} />
        </>
    );
}