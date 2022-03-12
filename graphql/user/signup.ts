import { gql } from "@apollo/client";
import { AuthResult } from "@graphql/auth-result";

export interface SignupVars {
    username: string
    password: string
    email: string
    firstName: string 
    lastName: string 
}

export interface SignupData {
    signup: AuthResult
}

export const SignupMutation = gql`
    mutation Signup(
        $username:  String!, 
        $password:  String!,
        $email:     String!,
        $firstName: String!,
        $lastName:  String!
    ) {
        signup(
            username: $username, 
            password: $password,
            email: $email,
            firstName: $firstName,
            lastName: $lastName
        ) {
            token
            user {
                id
                username
                
            }
        }
    }
`;