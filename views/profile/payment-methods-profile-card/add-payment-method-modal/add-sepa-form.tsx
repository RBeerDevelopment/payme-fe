import React from "react";
import { FormHookInput } from "@components/form-hook-inputs";
import { EmptyFn } from "x";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SendState, SendStateButton } from "@components/button";
import { AddSepaData, AddSepaVars, ADD_SEPA_MUTATION } from "@graphql/sepa";
import { UserData, USER_QUERY } from "@graphql/user";
import { useAuthContext } from "context";

interface Props {
    closeModal: EmptyFn
}

export function AddSepaForm(props: Props): React.ReactElement {

    const { closeModal } = props;

    const { user: authUser } = useAuthContext();

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [sendState, setSendState] = React.useState<SendState>(SendState.NotSend);

    const [ addPaypal, { data, loading, error }] = useMutation<AddSepaData, AddSepaVars>(ADD_SEPA_MUTATION, { 
        errorPolicy: "all",
        update(cache, { data }) {
            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, sepa: [ ...(userData.user.sepa || []), data?.addSepa ]};

            cache.writeQuery({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true }, data: { user: updatedUser } });
        }
    });

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
    
    async function onSubmit({ accountName, iban }: FieldValues) {
        addPaypal({ variables: { accountName, iban }});
    }
    
    return (
        <React.Fragment>
            <form className="space-y-4" action="#">
                <FormHookInput
                    name="iban"
                    label="IBAN"
                    type="text"
                    errorMessage={errors.iban && errors.iban.message}
                    hookFormSpread={register("iban", {
                        required: "form-iban-error",
                        pattern: {
                            value: /^([A-Z]{2})([0-9]{2})([A-Z0-9]{9,30})$/i,
                            message: "Please enter a valid IBAN"
                        }
                    })}
                />

                <FormHookInput
                    name="accountName"
                    label="Title"
                    type="text"
                    errorMessage=""
                    hookFormSpread={register("accountName")}
                />

                <SendStateButton 
                    defaulText="Save"
                    errorText="Error"
                    onClick={handleSubmit(onSubmit)}
                    state={sendState}
                    width="1/3"
                />
            </form>
        </ React.Fragment>
    );
}