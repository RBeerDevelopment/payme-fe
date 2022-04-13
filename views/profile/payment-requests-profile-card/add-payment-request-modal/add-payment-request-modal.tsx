import { Modal } from "@components/modal/modal";
import React from "react";
import { AddPaymentRequestForm } from "./add-payment-request-form";

interface Props {
    hideModal: () => void
    show: boolean
}


export function AddPaymentRequestModal(props: Props): React.ReactElement {

    const { hideModal, show } = props;

    // const [paymentOption, setPaymentOption] = React.useState();
    
    return (
        <>
            <Modal hideModal={hideModal} show={show} title="New Payment Request">
                <div className="bg-white rounded-md pt-8 divide-y-2">
                    <AddPaymentRequestForm closeModal={hideModal} />
                    {/* <div className="pt-4">
                        {paymentOption.value === SupportedPaymentMethod.PayPal && <AddPaypalForm closeModal={hideModal} />}
                        {paymentOption.value === SupportedPaymentMethod.Sepa   && <AddSepaForm closeModal={hideModal} />}
                    </div> */}
                </div>
            </Modal>
        </>
    );
}"";