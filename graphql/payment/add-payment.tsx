import { gql } from "@apollo/client";
import { Payment } from "./payment";


export interface AddPaymentVars {
    name: string
    description?: string
    amount: number
    currency: string
}

export interface AddPaymentData {
    addPayment: Payment
}

export const ADD_PAYMENT_MUTATION = gql`
    mutation AddPayment(
        $name:          String!,
        $description:   String,
        $amount:        Float!,
        $currency:      Currency!,
    ) {
        addPayment(
            name: $name, 
            description: $description,
            amount: $amount,
            currency: $currency
        ) {
            id
            name
            description
            amount
            currency
            isPaid
            createdAt
        }
    }
`;