export interface Paypal {
    id: number
    username: string
    accountName: string
}


export function instanceOfPaypal(object: any): object is Paypal {
    return "username" in object;
}