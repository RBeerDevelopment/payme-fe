import { gql } from "@apollo/client";
import { Paypal } from "./paypal";


export interface AddPayPalVars {
    username: string
    accountName?: string
}

export interface AddPayPalData {
   addPaypal : Paypal
}

export const ADD_PAYPAL_MUTATION = gql`
    mutation AddPaypal(
        $username:     String!, 
        $accountName:  String,
    ) {
        addPaypal(
            username: $username, 
            accountName: $accountName
        ) {
            id
            username
            accountName
        }
    }
`;