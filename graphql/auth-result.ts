export interface AuthResult {
    token: string
    user: { 
        id: number,
        username: string
    }
}
  