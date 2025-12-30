import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../types/notification";

interface NotificationState {
    items: Notification[];
}

const initialState: NotificationState = {
    items: []
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<Notification>
        ) => {
            state.items.push(action.payload);
        },

        removeNotification: (
            state,
            action: PayloadAction<string>
        ) => {
            state.items = state.items.filter(
                n => n.id !== action.payload
            );
        },

        clearNotifications: state => {
            state.items = [];
        }
    }
});

export const {
    showNotification,
    removeNotification,
    clearNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;
