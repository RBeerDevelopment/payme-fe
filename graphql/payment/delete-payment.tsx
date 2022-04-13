import { gql } from "@apollo/client";

export interface DeletePaymentVars {
    id: number
}

export interface DeletePaymentData {
    deletePayment: {
        id: number
    }
}

export const DELETE_PAYMENT_MUTATION = gql`
    mutation DeletePayment(
        $id:     Int!,
    ) {
        deletePayment(
            id: $id
        ) {
            id
        }
    }
`;