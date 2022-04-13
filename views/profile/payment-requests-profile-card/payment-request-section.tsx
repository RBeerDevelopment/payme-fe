import { Accordion } from "@components/accordion/accordion";
import { Payment } from "@graphql/payment/payment";
import React from "react";
import { CheckCircleIcon, DotsCircleHorizontalIcon } from "@heroicons/react/solid";
import { ConfirmModal } from "@components/modal";
import { useMutation } from "@apollo/client";
import { DeletePaymentData, DeletePaymentVars, DELETE_PAYMENT_MUTATION } from "@graphql/payment/delete-payment";
import { UserData, USER_QUERY } from "@graphql/user";
import { useAuthContext } from "context/auth-context/auth-context";
import { PaymentRequestBody } from "./payment-request-body";
import { SetPaymentPaidData, SetPaymentPaidVars, SET_PAYMENT_PAID_MUTATION } from "@graphql/payment/set-payment-paid";

interface Props {
    payments: Payment[]
}

export function PaymentRequestSection(props: Props): React.ReactElement {

    const { payments } = props;

    const { user: authUser } = useAuthContext();


    const [selectedPaymentRequest, setSelectedPaymentRequest] = React.useState<Payment | undefined>();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);


    const [ deletePaymentRequest ] = useMutation<DeletePaymentData, DeletePaymentVars>(DELETE_PAYMENT_MUTATION, {
        errorPolicy: "all",
        update(cache, { data }) {

            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, payment: userData.user.payments?.filter(p => p.id !== data?.deletePayment.id)};

            cache.writeQuery({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true }, data: { user: updatedUser } });
        }
    });

    const [ setPaymentPaid ] = useMutation<SetPaymentPaidData, SetPaymentPaidVars>(SET_PAYMENT_PAID_MUTATION, {
        errorPolicy: "all",
        update(cache, { data }) {

            const userData = cache.readQuery<UserData>({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true } });

            if(!userData) return;

            const updatedUser = { ...userData.user, payments: 
                userData.user.payments?.map(p => {
                    if(p.id !== data?.setPaymentPaid.id) {
                        return p;
                    }

                    return { ...p, isPaid: !p.isPaid };
                })
            }; 

            cache.writeQuery({ query: USER_QUERY, variables: { username: authUser?.username, onlyActive: true }, data: { user: updatedUser } });
        }
    });


    function onDelete(p: Payment) {
        setDeleteDialogOpen(true);
        setSelectedPaymentRequest(p);
    }

    function onEdit(p: Payment) {
        // needs to be implemented
    }

    function onTogglePaid(p: Payment) {

        if(!p) return;

        const id = parseInt("" + p.id);
        setPaymentPaid({ 
            variables: { id, paid: !p.isPaid },
            optimisticResponse: {
                setPaymentPaid: {
                    id
                }
            }
        });
    }

    function handleDeletePaymentRequest(p?: Payment) {
        if(!p) return;

        const id = parseInt("" + p.id);

        deletePaymentRequest({
            variables: { id },
            optimisticResponse: {
                deletePayment: {
                    id
                }
            }
        });
    }

    return (
        <div className="mb-4">
            {payments.map(p => {
                const header =  <div className="flex flex-row justify-between w-full mr-6 h-full items-center my-4" key={p.id}>
                    <div>
                        <p className="text-lg text-left font-semibold">{p.name}</p>
                        <p className="text-left">{`${p.amount} ${p.currency}`}</p>
                       
                    </div>
                    {p.isPaid ? <CheckCircleIcon className="h-8 w-8 text-green-500 justify-end" /> : <DotsCircleHorizontalIcon className="h-8 w-8 text-gray-500 items-center text-center" />}
                </div>;

                const content = <PaymentRequestBody payment={p} onTogglePaid={onTogglePaid} onDelete={onDelete} onEdit={onEdit} />;

                return (<Accordion key={p.id} title={header} content={content} />);

            })}
            <ConfirmModal
                onConfirm={() => {handleDeletePaymentRequest(selectedPaymentRequest);}}
                title={`Delete ${selectedPaymentRequest?.name}?`}
                content="Are you sure you want to delete this payment request?"
                hideModal={() => { setDeleteDialogOpen(false); }}
                show={deleteDialogOpen}
            />
        </ div>
    );
}