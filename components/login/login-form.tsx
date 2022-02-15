
import React from "react";
import { useForm } from "react-hook-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { LoginFormInput } from "./login-form-input";
import { LoginFormButton } from "./login-form-button";
import { SendState } from "./send-state";
import { useTranslation } from "next-i18next";

interface Response {
    success: boolean
    errorMessage?: string
}

export function LoginForm() {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [token, setToken] = React.useState(null);
    const captchaRef = React.useRef(null);
    const [captchaError, setCaptchaError] = React.useState(false);

    const [state, setState] = React.useState<SendState>(SendState.NotSend);

    const { t } = useTranslation("login");


    async function onSubmit({ username, password }: any) {

        setCaptchaError(false);

        if (!token || token === "") {
            setCaptchaError(true);
            return;
        }

        setState(SendState.Sending);

        const rawResponse = await fetch("/api/sendmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const response: Response = await rawResponse.json();
        if (response.success) {
            setState(SendState.Success);
        } else {
            setState(SendState.Error);
        }

    }

    return (
        <div className="pb-2 w-full flex items-center center-content justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden m-4 p-5 w-4/5 md:w-1/2 lg:w-2/5">
                <p className="text-xl font-semibold capitalize text-center py-4">{t("form-header")}</p>
                <form className="space-y-4" action="#">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="grid gap-6">

                            <LoginFormInput
                                name="username"
                                type="text"
                                error={errors.username}
                                hookFormSpread={register("username", {
                                    required: "form-username-error",
                                })}
                            />

                            <LoginFormInput
                                name="password"
                                type="password"
                                autocomplete="password"
                                error={errors.email}
                                hookFormSpread={register("password", {
                                    required: "form-password-error",
                                // pattern: {
                                //     value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                //     message: "form-password-error",
                                // },
                                })}
                            />
                        </div>
                    </div>

                    {/* <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_KEY}
                        onVerify={setToken}
                        ref={captchaRef}
                    /> */}
                    {/* {captchaError && (
                        <div className="text-normal text-red-500">
                            {t("form-captcha-error")}
                        </div>
                    )} */}

                    <LoginFormButton
                        handleClick={handleSubmit(onSubmit)}
                        state={state}
                    />
                    <a className="text-green-800 underline text-center">{t("form-forgot-password")}</a>

                </form>
            </div>
        </div>
    );
}
