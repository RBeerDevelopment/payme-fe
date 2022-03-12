import { gql } from "@apollo/client";
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
    paypal?: Paypal[]
}

export interface UserData {
    user: User
}

export interface UserQueryVars {
    username: string
}

export const USER_QUERY = gql`
    query User($username: String!) {
        user(username: $username) {
            id
            username
            firstName
            lastName
            email
            avatarUrl
            sepa {
                id
                accountName
            }
            paypal {
                id
                accountName
                username
            }
        }
    }
`;