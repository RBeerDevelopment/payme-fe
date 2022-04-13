import "@styles/globals.css";
import Head from "next/head";

import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { AuthProvider, AppProvider } from "context";
import { RouteGuard } from "@components/route-guard";

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {

    return (
        <>
            <Head>
                <title>Pay Me</title>
                <link rel='icon' href='/favicon.ico' />
                {/* <meta name="description" content="Full-Stack Web and Mobile Developer with more than 7 years of experience." /> */}
            </Head>
            <AuthProvider>
                <AppProvider>
                    <ApolloProvider client={client}>
                        <RouteGuard>
                            <Component {...pageProps} />
                        </RouteGuard>
                    </ApolloProvider>
                </AppProvider>
            </ AuthProvider>
        </>
    );
}

export default appWithTranslation(MyApp);
