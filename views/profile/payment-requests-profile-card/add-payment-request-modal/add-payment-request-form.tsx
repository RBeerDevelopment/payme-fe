import React from "react";
import { FormHookInput } from "@components/form-hook-inputs/form-hook-input";
import { EmptyFn } from "@components/text-button";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AddPayPalData, AddPayPalVars, ADD_PAYPAL_MUTATION } from "@graphql/paypal/add-paypal";
import { SendState, SendStateButton } from "@components/send-state-button";
import { DropdownSelect } from "@components/dropdown-select/dropdown-select";
import { AddPaymentData, AddPaymentVars, ADD_PAYMENT_MUTATION } from "@graphql/payment/add-payment";
import { cacheSlot, Reference } from "@apollo/client/cache";
import { useAuthContext } from "context/auth-context/auth-context";
import { User, UserData, USER_QUERY } from "@graphql/user";

interface Props {
    closeModal: EmptyFn
}

const currencyOptions = [
    { label: "USD" },
    { label: "GBP" },
    { label: "EUR" },
    { label: "AUD" },
    { label: "JPY" },
    { label: "CNY" }
];

export function AddPaymentRequestForm(props: Props): React.ReactElement {

    const { closeModal } = props;

    const { user: authUser } = useAuthContext();

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [sendState, setSendState] = React.useState<SendState>(SendState.NotSend);
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencyOptions[0]);

    const [ addPayment, { data, loading, error }] = useMutation<AddPaymentData, AddPaymentVars>(ADD_PAYMENT_MUTATION, { 
        errorPolicy: "all",
        update(cache, { data }) {
            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, payments: [ ...userData.user.payments, data?.addPayment ]};

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

    async function onSubmit({ name, description, amount }: FieldValues) {
        addPayment({ variables: { 
            name, 
            description, 
            amount: parseFloat(amount), 
            currency: selectedCurrency.label 
        }});
    }
    
    return (
        <React.Fragment>
            <form className="space-y-4" action="#">
                <FormHookInput
                    name="name"
                    label="Name"
                    type="text"
                    errorMessage={errors.name}
                    hookFormSpread={register("name", {
                        required: "form-name-error",
                    })}
                />

                <FormHookInput
                    name="description"
                    label="Description"
                    type="text"
                    errorMessage={errors.description}
                    hookFormSpread={register("description")}
                />

                <FormHookInput
                    name="amount"
                    label="Amount"
                    type="number"
                    errorMessage={errors.amount}
                    hookFormSpread={register("amount", {
                        required: "form-amount-error"
                    })}
                />

                <DropdownSelect 
                    options={currencyOptions}
                    selectedOption={selectedCurrency}
                    setSelectedOption={setSelectedCurrency}
                    label="Currency"
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