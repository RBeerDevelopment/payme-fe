import React from "react";
import { FormHookInput } from "@components/form-hook-input/form-hook-input";
import { TextButton } from "@components/text-button";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AddPayPalData, AddPayPalVars, ADD_PAYPAL_MUTATION } from "@graphql/paypal/add-paypal";

// interface Props {
// }

export function AddPaypalForm(): React.ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [ addPaypal, { data, loading, error }] = useMutation<AddPayPalData, AddPayPalVars>(ADD_PAYPAL_MUTATION, { errorPolicy: "all" });


    console.log({ data });
    
    async function onSubmit({ accountName, username }: FieldValues) {
        console.log({ accountName, username });

        addPaypal({ variables: { accountName, username }});
    }
    
    return (
        <React.Fragment>
            <form className="space-y-4" action="#">
                <div className="rounded-md shadow-sm space-y-4">
                    <FormHookInput
                        name="username"
                        label="Paypal-Username"
                        type="text"
                        errorMessage={errors.username}
                        hookFormSpread={register("username", {
                            required: "form-username-error",
                        })}
                    />

                    <FormHookInput
                        name="accountName"
                        label="Title"
                        type="text"
                        errorMessage={errors.accountName}
                        hookFormSpread={register("accountName", {
                            required: "form-accountName-error",
                        })}
                    />
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

                <div className="flex justify-center">
                    <TextButton paddingX={8} onClick={handleSubmit(onSubmit)}>
                    Save    
                    </TextButton>
                </div>
            </form>
        </ React.Fragment>
    );
}