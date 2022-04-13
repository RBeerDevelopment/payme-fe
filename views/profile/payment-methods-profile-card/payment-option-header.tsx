import { ColoredCircleLetter } from "@components/colored-circle-letter";
import { PaymentMethod } from "@graphql/types";
import { instanceOfPaypal, Paypal } from "@graphql/paypal";
import { Sepa } from "@graphql/sepa";
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
        <div className="text-lg flex flex-row space-x-4 ml-2 my-3 h-full items-center" key={paymentMethod.id}>
            {colorLetter}
            <div>
                <p className="text-lg text-left font-semibold flex flex-row h-full items-center">{paymentMethod.accountName || (paymentMethod as Sepa).iban || (paymentMethod as Paypal).username}</p>
                {paymentMethod.accountName && <p>{(paymentMethod as Sepa).iban || (paymentMethod as Paypal).username}</p>}
            </div>
        </div>
    );
}