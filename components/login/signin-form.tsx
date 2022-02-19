import { useMutation } from "@apollo/client";
import { AuthData, LoginMutation, LoginVars } from "graphql/user";
import { useTranslation } from "next-i18next";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ActionType } from "./action-type";
import { LoginFormButton } from "./login-form-button";
import { LoginFormInput } from "./login-form-input";
import { SendState } from "./send-state";


export function SigninForm(): React.ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ login, { data, loading, error }] = useMutation<AuthData, LoginVars>(LoginMutation);

    // const [token, setToken] = React.useState(null);
    // const captchaRef = React.useRef(null);
    // const [captchaError, setCaptchaError] = React.useState(false);

    const [state, setState] = React.useState<SendState>(SendState.NotSend);
    
    const { t } = useTranslation("login");

    React.useEffect(() => {
        if(error) setState(SendState.Error);
        if(loading) setState(SendState.Sending);

        if(data) {
            setState(SendState.Success);
            // actually login user here
            localStorage.setItem("token", data.token);
        }
    }, [data, loading, error]);

    async function onSubmit({ username, password }: FieldValues) {


        // setCaptchaError(false);

        // if (!token || token === "") {
        //     setCaptchaError(true);
        //     return;
        // }

        login({ variables: { username, password }});

    }
    

    return (
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
                        error={errors.password}
                        hookFormSpread={register("password", {
                            required: "form-password-error",
                            minLength: 8
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
                actionType={ActionType.Signin}
                state={state}
            />
            <div className="w-full text-center mt-0">
                <a className="hover:underline text-gray-900 mt-0 cursor-pointer text-sm">{t("form-forgot-password")}</a>
            </div>

        </form>
    );
}