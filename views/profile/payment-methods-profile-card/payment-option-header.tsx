import { ColoredCircleLetter } from "@components/colored-circle-letter/colored-circle-letter";
import { PaymentMethod } from "@graphql/payment-method";
import { instanceOfPaypal, Paypal } from "@graphql/paypal/paypal";
import { Sepa } from "@graphql/sepa/sepa";
import React from "react";

interface Props {
    paymentMethod: PaymentMethod
}

export function PaymentOptionHeader(props: Props): React.ReactElement {

    const { paymentMethod } = props;

    const colorLetter = instanceOfPaypal(paymentMethod) ?
        <ColoredCircleLetter letter="P" color="bg-paypal" /> :
        <ColoredCircleLetter letter="S" color="bg-sepa" />;

    return (
        <div className="text-lg flex flex-row space-x-4 mb-6" key={paymentMethod.id + paymentMethod.accountName}>
            <div className="mt-2">
                {colorLetter}
            </div>
            <div>
                <p className="text-lg text-left font-semibold">{paymentMethod.accountName || (paymentMethod as Sepa).iban || (paymentMethod as Paypal).username}</p>
                {paymentMethod.accountName && <p className="">{(paymentMethod as Sepa).iban || (paymentMethod as Paypal).username}</p>}
            </div>
        </div>
    );
}