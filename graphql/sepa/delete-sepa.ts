import { gql } from "@apollo/client";

export interface DeleteSepaVars {
    id: number
}

export interface DeleteSepaData {
    deleteSepa: {
        id: number
    }
}

export const DELETE_SEPA_MUTATION = gql`
    mutation DeleteSepa(
        $id:     Int!,
    ) {
        deleteSepa(
            id: $id
        ) {
            id
        }
    }
`;