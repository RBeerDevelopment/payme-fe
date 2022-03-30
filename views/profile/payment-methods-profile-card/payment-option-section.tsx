import { ColoredCircleLetter } from "@components/colored-circle-letter/colored-circle-letter";
import { Paypal } from "@graphql/paypal/paypal";
import { Sepa } from "@graphql/sepa/sepa";
import React from "react";

interface Props {
    paymentMethods: Paypal[] | Sepa[]
}

export function PaymentOptionSection(props: Props): React.ReactElement {

    const { paymentMethods } = props;

    
    return (
        <>
            {paymentMethods.map(pm => {
                const colorLetter =  instanceOfPaypal(pm) ?
                    <ColoredCircleLetter letter="P" color="bg-paypal" /> :
                    <ColoredCircleLetter letter="S" color="bg-sepa" />;
                
                console.log(pm);
                return (
                    <div className="text-lg flex flex-row space-x-4 mb-6" key={pm.id + pm.accountName}>
                        <div className="mt-2">
                            {colorLetter}
                        </div>
                        <div>
                            <p className="text-lg font-semibold -mb-2">{pm.accountName || (pm as Sepa).iban || (pm as Paypal).username}</p>
                            {pm.accountName && <p className="">{(pm as Sepa).iban || (pm as Paypal).username}</p>}
                        </div>
                    </div>);
            })}
        </>
    );
}

function instanceOfPaypal(object: any): object is Paypal {
    return "username" in object;
}