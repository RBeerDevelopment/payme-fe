import { DropdownSelect } from "@components/dropdown-select/dropdown-select";
import { Modal } from "@components/modal/modal";
import React from "react";
import { PaymentMethod } from "../payment-methods-profile-card/payment-method";
import { AddPaypalForm } from "./add-paypal-form";

interface Props {
    hideModal: () => void
    show: boolean
}

const availablePaymentMethods = [
    {
        value: PaymentMethod.PayPal,
        label: "PayPal"
    },
    {
        value: PaymentMethod.Sepa,
        label: "SEPA"
    }
];

export function AddPaymentMethodModal(props: Props): React.ReactElement {

    const { hideModal, show } = props;

    const [paymentOption, setPaymentOption] = React.useState(availablePaymentMethods[0]);
    
    return (
        <>
            <Modal hideModal={hideModal} show={show} title="Add Payment Method">
                <div className="bg-white rounded-md pt-8 divide-y-2">
                    <div className="pb-6">
                        <DropdownSelect options={availablePaymentMethods} selectedOption={paymentOption} label="Type" setSelectedOption={setPaymentOption} />
                    </div>
                    <div className="pt-4">
                        {paymentOption.value === PaymentMethod.PayPal && <AddPaypalForm />}
                    </div>
                </div>
            </Modal>
        </>
    );
}"";