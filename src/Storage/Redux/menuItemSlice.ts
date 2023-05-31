import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItem: []
}

export const menuItemSlice = createSlice({
    name: "menuItem",
    initialState: initialState,
    reducers: {
        setMenuItem: (state, action) => {
            state.menuItem = action.payload;
        }
    }
});

export const { setMenuItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;