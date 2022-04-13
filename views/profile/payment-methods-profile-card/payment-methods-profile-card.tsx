import { User } from "@graphql/user";
import React from "react";
import { AddPaymentMethodModal } from "./add-payment-method-modal";
import { TextButton } from "@components/button";
import { PaymentOptionSection } from "./payment-option-section";
import { ProfileCard } from "@components/cards";

interface Props {
    user?: User
}

export function PaymentMethodsProfileCard(props: Props): React.ReactElement {

    const { user } = props;
    const [showModal, setShowModal] = React.useState(false);

    const paypal = user?.paypal || [];
    const sepa = user?.sepa || [];

    return (
        <>
            <ProfileCard title="Payment Methods">
                <PaymentOptionSection paymentMethods={[...sepa, ...paypal ]} />
                <div className="flex justify-center w-full">
                    <TextButton onClick={() => setShowModal(true)}>Add</TextButton>
                </div>
            </ProfileCard>
            
            <AddPaymentMethodModal hideModal={() => { setShowModal(false); }} show={showModal} />
        </>
    );
}