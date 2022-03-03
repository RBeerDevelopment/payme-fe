import { gql } from "@apollo/client";
import { AuthResult } from "@graphql/auth-data";
  
export interface LoginVars {
    username: string
    password: string
}

export interface LoginData {
    login: AuthResult
}

export const LoginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;