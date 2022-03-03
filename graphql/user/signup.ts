import { gql } from "@apollo/client";

export interface SignupVars {
    username: string
    password: string
    email: string
    firstName: string 
    lastName: string 
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
            }
        }
    }
`;