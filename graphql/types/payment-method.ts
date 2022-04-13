import { Paypal } from "../paypal/paypal";
import { Sepa } from "../sepa/sepa";

export type PaymentMethod = Sepa | Paypal