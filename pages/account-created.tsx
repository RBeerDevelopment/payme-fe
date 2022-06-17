import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout";
import { AccountCreated } from "../views/account-created";

export default function AccountCreatedPage(): React.ReactElement {

    return (
        <Layout>
            <AccountCreated />
        </Layout>
    );
}

export async function getStaticProps({ locale }: { locale: string}) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["login"])),
        },
    };
}
