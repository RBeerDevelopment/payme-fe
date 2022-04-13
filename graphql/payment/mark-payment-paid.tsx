import { gql } from "@apollo/client";


export interface MarkPaymentPaidVars {
    id: number
}

export interface MarkPaymentPaidData {
    markPaymentPaid: {
        id: number
    }
}

export const MARK_PAYMENT_PAID_MUTATION = gql`
    mutation MarkPaymentPaid(
        $id: Int!
    ) {
        markPaymentPaid(
            id: $id
        ) {
            id
        }
    }
`;