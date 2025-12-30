import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import { fetchProductsApi } from "../services/productService";

export const fetchProducts = createAsyncThunk<Product[]>(
    "product/fetch",
    async () => {
        const res = await fetchProductsApi();
        return res.data;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: { items: [] as Product[] },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    }
});

export default productSlice.reducer;
