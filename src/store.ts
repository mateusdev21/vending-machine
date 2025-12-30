import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import modalReducer from "./features/modalSlice";
import paymentReducer from "./features/paymentSlice";
import notificationReducer from "./features/notificationSlice";
import transactionReducer from "./features/transactionSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        modal: modalReducer,
        payment: paymentReducer,
        notification: notificationReducer,
        transaction: transactionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
