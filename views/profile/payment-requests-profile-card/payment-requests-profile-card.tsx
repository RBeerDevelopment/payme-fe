import { User } from "../../../graphql";
import React from "react";
import { ProfileCard } from "@components/cards";
import { TextButton } from "@components/text-button";
import { PaymentRequestSection } from "./payment-request-section";
import { AddPaymentRequestModal } from "./add-payment-request-modal/add-payment-request-modal";
import { ConfirmModal } from "@components/modal";
import { Payment } from "@graphql/payment/payment";


interface Props {
    user?: User
}


export function PaymentRequestsProfileCard(props: Props): React.ReactElement {

    const { user } = props;

    const [showModal, setShowModal] = React.useState(false);
    

    // eslint-disable-next-line prefer-const
    let payments = user?.payments || [];
    const sortedPayments = [...payments].sort(sortPaymentByStatus);

    return (
        <>
            <ProfileCard title="Payment Requests">
                <PaymentRequestSection payments={sortedPayments} />
                <div className="flex justify-center w-full">
                    <TextButton onClick={() => setShowModal(true)}>New</TextButton>
                </div>
            </ ProfileCard>
            <AddPaymentRequestModal hideModal={() => { setShowModal(false); }} show={showModal} />
        </>
    );
}

function sortPaymentByStatus(a: Payment, b: Payment): number {
    return Number(a.isPaid) - Number(b.isPaid);
}