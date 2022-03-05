import { Sepa } from "@graphql/sepa/sepa";
import React from "react";

interface Props {
    onSave: (sepa: Sepa) => void
}

export function AddSepaForm(props: Props): React.ReactElement {

    const { onSave } = props;
    
    return (
        <React.Fragment>
           content
        </ React.Fragment>
    );
}