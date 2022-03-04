import { gql } from "@apollo/client";
import { Sepa } from "@graphql/sepa/sepa";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string
    avatarUrl: string
    sepa?: Sepa[]
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
                iban
                bic
                bankName
                accountName
            }
        }
    }
`;