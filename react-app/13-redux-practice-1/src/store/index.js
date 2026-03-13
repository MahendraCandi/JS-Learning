import {configureStore} from "@reduxjs/toolkit";
import {cartSlice} from "./cart";
import {uiSlice} from "./ui-slice";

export const store = configureStore({
  reducer: {
    carts: cartSlice.reducer,
    uis: uiSlice.reducer,
  }
});
