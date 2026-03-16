import {createSlice} from "@reduxjs/toolkit";

/**
 * <pre>
 *   {
 *     openCart: false,
 *     notification: {
 *       status: '',
 *       title: '',
 *       message: '',
 *     },
 *   }
 */
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    openCart: false,
    notification: null,
  },
  reducers: {
    toggleCart: (state) => {
      state.openCart = !state.openCart;
      console.log('state', state.openCart);
    },
    pushNotification: (state, payload) => {
      state.notification = payload.payload;
    }
  },
});

export const uiActions = uiSlice.actions;
