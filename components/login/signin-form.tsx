import { useMutation } from "@apollo/client";
import { AuthData, LoginMutation, LoginVars } from "../../graphql";
import router from "next/router";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ActionType } from "./action-type";
import { LoginFormButton } from "./login-form-button";
import { LoginFormInput } from "./login-form-input";
import { SendState } from "./send-state";


export function SigninForm(): React.ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [ login, { data, loading, error }] = useMutation<AuthData, LoginVars>(LoginMutation, { errorPolicy: "all" });

    // const [token, setToken] = React.useState(null);
    // const captchaRef = React.useRef(null);
    // const [captchaError, setCaptchaError] = React.useState(false);

    const [state, setState] = React.useState<SendState>(SendState.NotSend);


    React.useEffect(() => {
        console.log("useEffect");
        if(error)  {
            setState(SendState.Error);
            console.log({error});
            return;
        }
        if(loading) { 
            setState(SendState.Sending); 
            return; 
        }

        if(data) {
            setState(SendState.Success);
            
            localStorage.setItem("token", data.login.token);
            router.push(`/profile/${data.login.user.username}`);
            return;
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

            <LoginFormButton
                handleClick={handleSubmit(onSubmit)}
                actionType={ActionType.Signin}
                state={state}
            />
        </form>
    );
}