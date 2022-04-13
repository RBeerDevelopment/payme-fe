import { gql } from "@apollo/client";

export interface DeletePaypalVars {
    id: number
}

export interface DeletePaypalData {
    deletePaypal: {
        id: number
    }
}

export const DELETE_PAYPAL_MUTATION = gql`
    mutation DeletePaypal(
        $id:     Int!,
    ) {
        deletePaypal(
            id: $id
        ) {
            id
        }
    }
`;