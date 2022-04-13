import { gql } from "@apollo/client";
import { Payment } from "@graphql/payment/payment";
import { Paypal } from "@graphql/paypal/paypal";
import { Sepa } from "@graphql/sepa/sepa";

export interface User {
    id: number,
    username: string,
    firstName?: string,
    lastName?: string,
    email?: string
    avatarUrl?: string
    sepa?: Sepa[]
    payments: Payment[]
    paypal?: Paypal[]
}

export interface UserData {
    user: User
}

export interface UserQueryVars {
    username: string
    onlyActive?: boolean
}

export const USER_QUERY = gql`
    query User($username: String!, $onlyActive: Boolean) {
        user(username: $username, onlyActive: $onlyActive) {
            id
            username
            firstName
            lastName
            email
            avatarUrl
            sepa {
                id
                accountName
                iban
            }
            paypal {
                id
                accountName
                username
            }
            payments {
                id
                name
                description
                amount
                currency
                isPaid
                createdAt
            }
        }
    }
`;