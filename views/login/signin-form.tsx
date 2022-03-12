import { useMutation } from "@apollo/client";
import { LoginData, LoginMutation, LoginVars } from "../../graphql";
import router from "next/router";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SendState } from "../../components/send-state-button/send-state";
import { FormHookInput } from "@components/form-hook-input/form-hook-input";
import { useTranslation } from "next-i18next";
import { useAuthContext } from "context/auth-context/auth-context";
import { SendStateButton } from "@components/send-state-button";


export function SigninForm(): React.ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ login, { data, loading, error }] = useMutation<LoginData, LoginVars>(LoginMutation, { errorPolicy: "all" });

    const { login: contextLogin } = useAuthContext();

    // const [token, setToken] = React.useState(null);
    // const captchaRef = React.useRef(null);
    // const [captchaError, setCaptchaError] = React.useState(false);

    const { t } = useTranslation("login");

    const [state, setState] = React.useState<SendState>(SendState.NotSend);


    React.useEffect(() => {
        if(error)  {
            setState(SendState.Error);
            return;
        }
        if(loading) { 
            setState(SendState.Sending); 
            return; 
        }

        if(data) {

            console.log("received data");
            const { token, user } = data.login; 
            
            setState(SendState.Success);

            contextLogin(user, token);

            router.push("/profile");
        }

        setState(SendState.NotSend);
        
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

                    <FormHookInput
                        name="username"
                        label={t("form-username")}
                        type="text"
                        errorMessage={errors.username && t(errors.username.message)}
                        hookFormSpread={register("username", {
                            required: "form-username-error",
                        })}
                    />

                    <FormHookInput
                        name="password"
                        label={t("form-password")}
                        type="password"
                        autocomplete="password"
                        errorMessage={errors.password && t(errors.password.message)}
                        hookFormSpread={register("password", {
                            required: "form-password-error",
                            minLength: { 
                                value: 8,
                                message: "form-password-error-length"
                            }
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
            <SendStateButton
                onClick={handleSubmit(onSubmit)}
                errorText={t("form-button-error")}
                defaulText={t("signin-form-button")}
                state={state}
                width="1/3"
            />
        </form>
    );
}