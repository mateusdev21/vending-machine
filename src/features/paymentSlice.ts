import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PaymentStatus =
    | "IDLE"
    | "INSERTING"
    | "SUCCESS"
    | "DISPENSING";

interface PaymentState {
    status: PaymentStatus;
    total: number;
    paid: number;
    change: number;
}

const initialState: PaymentState = {
    status: "IDLE",
    total: 0,
    paid: 0,
    change: 0
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        startCashPayment(state, action: PayloadAction<number>) {
            state.status = "INSERTING";
            state.total = action.payload;
            state.paid = 0;
            state.change = 0;
        },
        insertMoney(state, action: PayloadAction<number>) {
            state.paid += action.payload;

            if (state.paid >= state.total) {
                state.status = "SUCCESS";
                state.change = state.paid - state.total;
            }
        },
        startDispensing(state) {
            state.status = "DISPENSING";
        },
        resetPayment() {
            return initialState;
        }
    }
});

export const {
    startCashPayment,
    insertMoney,
    startDispensing,
    resetPayment
} = paymentSlice.actions;

export default paymentSlice.reducer;
