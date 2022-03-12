import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@components/layout";
import { ClientOnly } from "@components/client-only";
import { Profile } from "@views/profile";
import { useAppContext } from "context/app-context/app-context";

export default function ProfilePage(): React.ReactElement {

    const { setTitle } = useAppContext();

    React.useEffect(() => {
        setTitle("Profile");
    }, []);

    return (
        <Layout>
            <div className="h-full">
                {/* <p className="text-4xl p-8 pt-0 pb-4">Profile</p> */}
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
