export interface AuthData {
    login: {
        token: string
        user: { 
            id: number,
            username: string
        }
    }
}
  