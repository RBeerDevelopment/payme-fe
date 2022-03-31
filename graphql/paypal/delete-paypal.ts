import { gql } from "@apollo/client";

export interface DeletePaypalVars {
    id: string
}

export const DELETE_PAYPAL_MUTATION = gql`
    mutation DeletePaypal(
        $id:     String!,
    ) {
        deletePaypal(
            id: $id
        ) {
        }
    }
`;