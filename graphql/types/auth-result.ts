import { AuthUser } from "@graphql/user";

export interface AuthResult {
    token: string
    user: AuthUser
}
  