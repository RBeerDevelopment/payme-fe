
import React from "react";
// import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ActionType } from "./action-type";
import { SignInUpSwitch } from "./sign-in-up-switch";
import { SigninForm } from "./signin-form";
import { useTranslation } from "next-i18next";
import { SignupForm } from "./signup-form";


export function Login() {
    
    const [actionType, setActionType] = React.useState<ActionType>(ActionType.Signin);

    const { t } = useTranslation("login");

    const headerText = selectHeaderText();

    function selectHeaderText(): string {
        if(actionType === ActionType.Signin) {
            return t("signin-form-header");
        }
        return t("signup-form-header");
    }

    return (
        <div className="pb-2 w-full flex flex-col items-center center-content justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden m-4 p-5 w-4/5 md:w-1/2 lg:w-2/5">
                <p className="text-xl font-semibold capitalize text-center py-4">{headerText}</p>
                {actionType === ActionType.Signup ? <SignupForm /> : <SigninForm />}
                <div className="w-full text-center mt-4">
                    <a className="hover:underline text-gray-900 mt-0 cursor-pointer text-sm">{t("form-forgot-password")}</a>
                </div>
            </div>
            <SignInUpSwitch actionType={actionType} setActionType={setActionType} />
        </div>
    );
}

