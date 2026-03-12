import {createSlice} from "@reduxjs/toolkit";

const initiateState = { count: 0, showCounter: true };

// The known problem could be solved by using redux toolkit
// The createSlice will create a slice of state.
// We can create multiple slice, and in behind redux toolkit will manage the state inside the store.
export const counterSlice = createSlice({
  name: 'counter', // the name of slice of state
  initialState: initiateState, // initial value
  reducers: {
    // instead using action type, we can create a function for each type.
    // This solved problem when the function become larger.

    // by using object, we don't need to worry the typos.
    // this solved problem using constant.
    increment: (state) => {
      // redux toolkit guarantee that the state is immutable. So we don't have to override the previous state.
      // This solved problem the needs to always return a new state.
      state.count += 1;
      console.log('state', state.count);
    },
    decrement: (state) => {
      state.count -= 1;
      console.log('state', state.count);
    },
    increase: (state, payload) => {
      state.count += payload.payload;
      console.log('payload', payload);
      console.log('state', state.count);
    },
    toggle: (state) => {
      state.showCounter = !state.showCounter;
      console.log('state', state.count);
    }
  }
});

export const counterActions = counterSlice.actions;
