import { User } from "@graphql/user";

export interface AuthState {
    user?: User
    token?: string
    // helper value to prevent errors with RouteGuard after reloads
    loading: boolean
    login: (user: User, token: string) => void
    logout: () => void
}

export const defaultAuthState: AuthState = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: true,
    login: (user: User, token: string) => { return; },
    logout: () => { return; }
};