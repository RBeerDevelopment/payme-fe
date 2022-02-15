import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LoginForm } from "@components/login/login-form";
import { Layout } from "@components/layout/layout";

export default function Login(): React.ReactElement {
    

    return (
        <Layout>
            <div>
                <LoginForm />
            </div>
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
