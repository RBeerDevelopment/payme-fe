import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout/layout";
import { useRouter } from "next/router";
import ClientOnly from "@components/client-only/client-only";
import { Profile } from "@components/profile/profile";

export default function Login(): React.ReactElement {

    const router = useRouter();
    const { username } = router.query;

    const usernameString = `${username}`;

    return (
        <Layout>
            <div className="h-full">
                <p className="text-4xl p-8 pb-4">Profile</p>
                <ClientOnly>
                    <Profile username={usernameString} />
                </ClientOnly>
            </div>
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
