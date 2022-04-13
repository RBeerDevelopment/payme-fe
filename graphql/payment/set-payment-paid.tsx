import { gql } from "@apollo/client";


export interface SetPaymentPaidVars {
    id: number,
    paid: boolean
}

export interface SetPaymentPaidData {
    setPaymentPaid: {
        id: number
    }
}

export const SET_PAYMENT_PAID_MUTATION = gql`
    mutation SetPaymentPaid(
        $id: Int!
        $paid: Boolean!
    ) {
        setPaymentPaid(
            id: $id
            paid: $paid
        ) {
            id
        }
    }
`;