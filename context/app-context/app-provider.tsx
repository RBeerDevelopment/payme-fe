import React from "react";
import { AppContext } from "./app-context";

interface Props {
    children: React.ReactNode
}

export function AppProvider(props: Props): React.ReactElement {

    const { children } = props;

    const [title, setTitle] = React.useState<string>("");

    const value = {
        title,
        setTitle
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </ AppContext.Provider>
    );
}