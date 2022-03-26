import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout";
import { Landing } from "@views/landing";

export default function Home(): React.ReactElement {

    return (
        <Layout>
            <Landing />
        </Layout>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["landing-welcome", "landing-options"])),
            // Will be passed to the page component as props
        },
    };
}
