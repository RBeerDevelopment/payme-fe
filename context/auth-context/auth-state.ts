import { AuthUser } from "@graphql/user";

export interface AuthState {
    user?: AuthUser
    token?: string
    // helper value to prevent errors with RouteGuard after reloads
    loading: boolean
    login: (user: AuthUser, token: string) => void
    logout: () => void
}

export const defaultAuthState: AuthState = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: true,
    login: (user: AuthUser, token: string) => { return; },
    logout: () => { return; }
};