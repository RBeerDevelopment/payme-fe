import { gql } from "@apollo/client";
import { Sepa } from "./sepa";


export interface AddSepaVars {
    iban: string
    accountName?: string
}

export interface AddSepaData {
   addSepa: Sepa
}

export const ADD_SEPA_MUTATION = gql`
    mutation AddSepa(
        $iban:     String!, 
        $accountName:  String,
    ) {
        addSepa(
            iban: $iban, 
            accountName: $accountName
        ) {
            id
            iban
            bic
            bankName
            accountName
        }
    }
`;