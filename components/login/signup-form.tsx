import { useMutation } from "@apollo/client";
import { SignupData, SignupMutation, SignupVars } from "../../graphql";
import router from "next/router";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ActionType } from "./action-type";
import { LoginFormButton } from "./login-form-button";
import { LoginFormInput } from "./login-form-input";
import { SendState } from "./send-state";


export function SignupForm(): React.ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ signup, { data, loading, error }] = useMutation<SignupData, SignupVars>(SignupMutation);

    // const [token, setToken] = React.useState(null);
    // const captchaRef = React.useRef(null);
    // const [captchaError, setCaptchaError] = React.useState(false);

    const [state, setState] = React.useState<SendState>(SendState.NotSend);

    React.useEffect(() => {
        if(error)  {
            setState(SendState.Error);
        }
        if(loading) setState(SendState.Sending);

        if(data) {
            const { token, user: { username } } = data.signup; 
            setState(SendState.Success);
            localStorage.setItem("token",token);
            router.push(`/profile/${username}`);
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

                    <LoginFormInput
                        name="firstName"
                        type="text"
                        autocomplete="firstName"
                        error={errors.firstName}
                        hookFormSpread={register("firstName", {
                            required: "form-first-name-error"
                        })}
                    />

                    <LoginFormInput
                        name="lastName"
                        type="text"
                        autocomplete="lastName"
                        error={errors.lastName}
                        hookFormSpread={register("lastName", {
                            required: "form-last-name-error"
                        })}
                    />

                    <LoginFormInput
                        name="email"
                        type="email"
                        autocomplete="email"
                        error={errors.email}
                        hookFormSpread={register("email", {
                            required: "form-email-error",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "form-email-error"
                            }
                        })}
                    />

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
            

        </form>
    );
}