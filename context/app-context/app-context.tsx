import React from "react";
import { AppState, defaultAppState } from "./app-state";


export const AppContext = React.createContext<AppState>(defaultAppState);

export function useAppContext(): AppState {
    return React.useContext(AppContext);
}