import { useTranslation } from "next-i18next";
import React from "react";

interface Props {
    i18nKey: string
}

export function SectionHeader(props: Props): React.ReactElement {

    const { i18nKey } = props;

    const { t } = useTranslation(i18nKey);

    return (
        <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
            <p className="ml-1 text-green-700 dark:text-green-400 uppercase tracking-loose">{t("header-subtitle")}</p>
            <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2 text-gray-900 dark:text-gray-50">{t("header-title")}</p>
            <p className="text-sm md:text-base text-gray-900 dark:text-gray-50 mb-4" dangerouslySetInnerHTML={{ __html: `${t("header-content")}` }}></p>
        </div>
    );
}