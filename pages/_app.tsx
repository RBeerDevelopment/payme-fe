import "@styles/globals.css";
import Head from "next/head";

import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
    return (
        <div>
            <Head>
                <title>Robin Beer</title>
                <link rel='icon' href='/favicon.ico' />
                <meta name="description" content="Full-Stack Web and Mobile Developer with more than 7 years of experience." />
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default appWithTranslation(MyApp);
