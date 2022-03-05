import { gql } from "@apollo/client";

export interface User {
    id: number,
    username: string,
    firstName?: string,
    lastName?: string,
    email?: string
    avatarUrl?: string
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
        }
    }
`;