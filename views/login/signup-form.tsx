import { useMutation } from "@apollo/client";
import { SignupData, SignupMutation, SignupVars } from "@graphql/user";
import router from "next/router";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SendState, SendStateButton } from "@components/button";
import { FormHookInput } from "@components/form-hook-inputs/form-hook-input";
import { useTranslation } from "next-i18next";
import { useAuthContext } from "context";


export function SignupForm(): React.ReactElement {

    const { login } = useAuthContext();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ signup, { data, loading, error }] = useMutation<SignupData, SignupVars>(SignupMutation);

    // const [token, setToken] = React.useState(null);
    // const captchaRef = React.useRef(null);
    // const [captchaError, setCaptchaError] = React.useState(false);

    const { t } = useTranslation("login");

    const [state, setState] = React.useState<SendState>(SendState.NotSend);

    React.useEffect(() => {
        if(error)  {
            setState(SendState.Error);
        }
        if(loading) setState(SendState.Sending);

        if(data) {
            const { token, user } = data.signup; 
            setState(SendState.Success);
            
            login(user, token);

            router.push("/profile");
        }
    }, [data, loading, error]);

    async function onSubmit({ username, password, email, firstName, lastName }: FieldValues) {


        // setCaptchaError(false);

        // if (!token || token === "") {
        //     setCaptchaError(true);
        //     return;
        // }

        try {
            signup({ variables: { username, password, email, firstName, lastName }});
        } catch(e) {
            console.log({ e });
        }

    }
    

    return (
        <form className="space-y-4" action="#">
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="grid gap-6">

                    <FormHookInput
                        name="firstName"
                        label={t("form-firstName")}
                        type="text"
                        autocomplete="firstName"
                        errorMessage={errors.firstName && t(errors.firstName.message.message)}
                        hookFormSpread={register("firstName", {
                            required: "form-first-name-error"
                        })}
                    />

                    <FormHookInput
                        name="lastName"
                        label={t("form-lastName")}
                        type="text"
                        autocomplete="lastName"
                        errorMessage={errors.lastName && t(errors.lastName.message)}
                        hookFormSpread={register("lastName", {
                            required: "form-last-name-error"
                        })}
                    />

                    <FormHookInput
                        name="email"
                        label={t("form-email")}
                        type="email"
                        autocomplete="email"
                        errorMessage={errors.email && t(errors.email.message)}
                        hookFormSpread={register("email", {
                            required: "form-email-error",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "form-email-error"
                            }
                        })}
                    />

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
            <SendStateButton
                onClick={handleSubmit(onSubmit)}
                errorText={t("form-button-error")}
                defaulText={t("signup-form-button")}
                width="1/3"
                state={state}
            />
            
        </form>
    );
}