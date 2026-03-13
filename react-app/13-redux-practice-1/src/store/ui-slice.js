import {createSlice} from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    openCart: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.openCart = !state.openCart;
      console.log('state', state.openCart);
    },
  },
});

export const uiActions = uiSlice.actions;
