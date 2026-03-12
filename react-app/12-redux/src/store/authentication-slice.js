import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null, // { name: null, email: null }
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login: (state, payload) => {
      state.user = payload.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
})

export const authActions = authSlice.actions;
