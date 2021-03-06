import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout";
import { ClientOnly } from "@components/client-only";
import { Profile } from "@views/profile";
import { useAppContext } from "context";

export default function ProfilePage(): React.ReactElement {

    const { setTitle } = useAppContext();

    React.useEffect(() => {
        setTitle("");
    }, []);

    return (
        <Layout>
            <div className="h-full">
                <ClientOnly>
                    <Profile />
                </ClientOnly>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ locale }: { locale: string}) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["profile"])),
        },
    };
}
