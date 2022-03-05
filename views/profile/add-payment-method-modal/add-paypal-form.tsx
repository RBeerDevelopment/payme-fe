import React from "react";
import { FormHookInput } from "@components/form-hook-input/form-hook-input";
import { EmptyFn } from "@components/text-button";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AddPayPalData, AddPayPalVars, ADD_PAYPAL_MUTATION } from "@graphql/paypal/add-paypal";
import { SendState, SendStateButton } from "@components/send-state-button";

interface Props {
    closeModal: EmptyFn
}

export function AddPaypalForm(props: Props): React.ReactElement {

    const { closeModal } = props;

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [sendState, setSendState] = React.useState<SendState>(SendState.NotSend);

    const [ addPaypal, { data, loading, error }] = useMutation<AddPayPalData, AddPayPalVars>(ADD_PAYPAL_MUTATION, { errorPolicy: "all" });


    

    React.useEffect(() => {
        if(data) {
            setSendState(SendState.Success);
            setTimeout(closeModal, 400);
        } else if(loading) {
            setSendState(SendState.Sending);
        } else if(error) {
            setSendState(SendState.Error);
        }
    },
    [data, loading, error]);

    async function onSubmit({ accountName, username }: FieldValues) {

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
                    <SendStateButton 
                        defaulText="Save"
                        errorText="Error"
                        onClick={handleSubmit(onSubmit)}
                        state={sendState}
                        width="1/3"
                    />
                </div>
            </form>
        </ React.Fragment>
    );
}