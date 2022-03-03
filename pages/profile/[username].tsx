import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout/layout";
import { useRouter } from "next/router";

export default function Login(): React.ReactElement {

    const router = useRouter();
    const { username } = router.query;

    return (
        <Layout>
            <p>{username}</p>
        </Layout>
    );
}

export async function getServerSideProps({ locale }: { locale: string}) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["profile"])),
            // Will be passed to the page component as props
        },
    };
}
