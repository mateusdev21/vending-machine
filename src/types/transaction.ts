import type { CartItem } from "./cart";

export interface Transaction {
    id?: number;
    items: CartItem[];
    total: number;
    paid: number;
    change: number;
    createdAt: string;
}
