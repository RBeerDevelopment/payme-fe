import { gql } from "@apollo/client";

export interface DeleteSepaVars {
    id: string
}

export const DELETE_SEPA_MUTATION = gql`
    mutation DeleteSepa(
        $id:     String!,
    ) {
        deleteSepa(
            id: $id
        ) {
        }
    }
`;