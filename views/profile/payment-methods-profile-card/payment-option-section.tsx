import { Paypal } from "@graphql/paypal/paypal";
import React from "react";
import { PaymentMethod } from "./payment-method";

interface Props {
    paymentMethodType: PaymentMethod
    paymentMethods: Paypal[]
}

export function PaymentOptionSection(props: Props): React.ReactElement {

    const { paymentMethodType, paymentMethods } = props;

    console.log({ paymentMethods});
    
    return (
        <>
            {paymentMethods.map(pm => {
                return (
                    <div key={pm.id}>
                        {pm.accountName}
                    </div>);
            })}
        </>
    );
}