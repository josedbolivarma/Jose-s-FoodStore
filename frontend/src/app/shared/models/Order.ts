import { CartItem } from "./CartItem";

export class Order {
    id!: number;
    items!: CartItem[];
    totalPrice!: number;
    createdAt!: string;
    status!: string;
}