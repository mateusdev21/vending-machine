import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find(i => i.id === action.payload.id);

            if (action.payload.stock <= 0) {
                return; // safety guard
            }

            if (existing) {
                if (existing.qty < action.payload.stock) {
                    existing.qty += 1;
                }
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
