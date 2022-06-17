
import React from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import eamilsentImage from "/public/images/emailsent.svg";

export function AccountCreated() {

    const { t } = useTranslation("login");

   
    const image = (
        <Image src={eamilsentImage} layout="fixed" width={window.outerWidth/4} />
    );
    
    return (
        <div className="pb-2 w-full h-full flex flex-col gap-6 items-center center-content justify-center">
            {image}
            <p className="px-6 pb-6 text-center">
                Thanks for signing up. Before you can start, we need you to confirm your email address.
                <br/><br/> After you&apos;ve done that, your ready to add a payment method and receive money from others.
            </p>
        </div>
    );
}

