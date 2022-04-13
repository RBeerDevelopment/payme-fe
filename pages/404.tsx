import React from "react";

import Image from "next/image";
import notTheDroids from "/public/images/NotTheDroids.webp";
import { Layout } from "@components/layout";

export default function Custom404() {
    return (
        <Layout>
            <div className="flex flex-col items-center ">
                <p className="text-3xl font-semibold m-8">404 - Page not found</p>
                <Image 
                    src={notTheDroids} 
                    alt="404 Image - Obi-Wan" 
                    layout="fixed" 
                    width={400} 
                    placeholder="blur"
                />
                <a className="m-12 text-blue-500 underline cursor-pointer" href="#">Home</a>
            </div>
        </Layout>
    );
}