import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Login } from "@views/login";
import { Layout } from "@components/layout";

export default function LoginPage(): React.ReactElement {

    return (
        <Layout>
            <Login />
        </Layout>
    );
}

export async function getStaticProps({ locale }: { locale: string}) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["login"])),
            // Will be passed to the page component as props
        },
    };
}
