import { gql } from "@apollo/client";

export interface AuthData {
    token: string
    user: { id: number }
  }
  
export interface LoginVars {
    username: string
    password: string
  }

export const LoginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
            }
        }
    }
`;