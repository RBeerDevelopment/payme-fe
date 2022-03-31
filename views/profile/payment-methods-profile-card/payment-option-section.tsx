import { Accordion } from "@components/accordion/accordion";
import { ColoredCircleLetter } from "@components/colored-circle-letter/colored-circle-letter";
import { PaymentMethod } from "@graphql/payment-method";
import { Paypal } from "@graphql/paypal/paypal";
import { Sepa } from "@graphql/sepa/sepa";
import React from "react";
import { PaymentOptionBody } from "./payment-option-body";
import { PaymentOptionHeader } from "./payment-option-header";

interface Props {
    paymentMethods: PaymentMethod[]
}

export function PaymentOptionSection(props: Props): React.ReactElement {

    const { paymentMethods } = props;

    
    return (
        <div className="mb-4">
            {paymentMethods.map(pm => {

                const header = <PaymentOptionHeader paymentMethod={pm}/>;
                const content = <PaymentOptionBody paymentMethod={pm} />;
                
                return (
                    <>
                        <Accordion key={pm.id + pm.accountName} title={header} content={content} />
                    </ >);
            })}
            
        </ div>
    );
}

