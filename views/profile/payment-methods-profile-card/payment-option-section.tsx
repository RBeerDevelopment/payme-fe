import { useMutation } from "@apollo/client";
import { Accordion } from "@components/accordion/accordion";
import { ConfirmModal } from "@components/modal";
import { PaymentMethod } from "@graphql/payment-method";
import { DeletePaypalData, DeletePaypalVars, DELETE_PAYPAL_MUTATION } from "@graphql/paypal/delete-paypal";
import { instanceOfPaypal } from "@graphql/paypal/paypal";
import { DeleteSepaData, DeleteSepaVars, DELETE_SEPA_MUTATION } from "@graphql/sepa/delete-sepa";
import { UserData, USER_QUERY } from "@graphql/user";
import { useAuthContext } from "context/auth-context/auth-context";
import React from "react";
import { PaymentOptionBody } from "./payment-option-body";
import { PaymentOptionHeader } from "./payment-option-header";

interface Props {
    paymentMethods: PaymentMethod[]
}

export function PaymentOptionSection(props: Props): React.ReactElement {

    const { paymentMethods } = props;
    
    const { user: authUser } = useAuthContext();

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethod | undefined>();

    const [ deletePaypal ] = useMutation<DeletePaypalData, DeletePaypalVars>(DELETE_PAYPAL_MUTATION, { 
        errorPolicy: "all",
        update(cache, { data }) {

            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, paypal: userData.user.paypal?.filter(p => p.id !== data?.deletePaypal.id)};

            cache.writeQuery({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true }, data: { user: updatedUser } });
        }
    });
    const [ deleteSepa ] = useMutation<DeleteSepaData, DeleteSepaVars>(DELETE_SEPA_MUTATION, {
        errorPolicy: "all",
        update(cache, { data }) {

            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, sepa: userData.user.sepa?.filter(p => p.id !== data?.deleteSepa.id)};

            cache.writeQuery({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true }, data: { user: updatedUser } });
        }
    });

    function onDelete(pm: PaymentMethod) {
        setDeleteDialogOpen(true);
        setSelectedPaymentMethod(pm);
    }

    function onEdit(pm: PaymentMethod) {
        // needs to be implemented
    }

    function handleDeletePaymentMethod(pm?: PaymentMethod) {
        if(!pm) return;

        const vars = { variables: { id: pm.id }};

        if(instanceOfPaypal(pm)) {
            deletePaypal(vars);
        } else {
            deleteSepa(vars);

        }
    }
    
    return (
        <div className="mb-4">
            {paymentMethods.map(pm => {

                const header = <PaymentOptionHeader paymentMethod={pm}/>;
                const content = <PaymentOptionBody subject={pm} onDelete={onDelete} onEdit={onEdit} />;
                
                return (<Accordion key={pm.id} title={header} content={content} />);
            })}

            <ConfirmModal
                onConfirm={() => {handleDeletePaymentMethod(selectedPaymentMethod);}}
                title={`Delete ${selectedPaymentMethod?.accountName}?`}
                content="Are you sure you want to delete this payment method?"
                hideModal={() => { setDeleteDialogOpen(false); }}
                show={deleteDialogOpen}
            />
            
        </ div>
    );
}

