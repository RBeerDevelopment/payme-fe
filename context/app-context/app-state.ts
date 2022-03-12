export interface AppState {
    title: string,
    setTitle: (title: string) => void
}

export const defaultAppState: AppState = {
    title: "PayMe",
    setTitle: (title: string) => { return; }
};