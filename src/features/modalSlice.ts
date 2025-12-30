import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalType } from "../types/modal";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        type: null as ModalType | null,
        props: {}
    },
    reducers: {
        openModal(
            state,
            action: PayloadAction<{ type: ModalType; props?: unknown }>
        ) {
            state.type = action.payload.type;
            state.props = action.payload.props || {};
        },
        closeModal(state) {
            state.type = null;
            state.props = {};
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
