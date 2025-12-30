import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../types/transaction";
import {
    createTransaction,
    fetchTransactions
} from "../services/transactionService";

interface TransactionState {
    items: Transaction[];
    loading: boolean;
}

const initialState: TransactionState = {
    items: [],
    loading: false
};

export const postTransaction = createAsyncThunk(
    "transaction/post",
    async (data: Transaction) => {
        const res = await createTransaction(data);
        return res.data;
    }
);

export const getTransactions = createAsyncThunk(
    "transaction/get",
    async () => {
        const res = await fetchTransactions();
        return res.data;
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getTransactions.pending, state => {
                state.loading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            });
    }
});

export default transactionSlice.reducer;
