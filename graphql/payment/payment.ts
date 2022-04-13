export interface Payment {
    id: number,
    name: string,
    description: string,
    amount: number,
    currency: string,
    isPaid: boolean,
    createdAt: Date
}