// In real project, we should use redux toolkit
// For learning purpose, it safe to use the legacy version
import { legacy_createStore as createStore } from 'redux';
import {createSlice} from "@reduxjs/toolkit";

// Please notice that the default value defined in the parameter.
// Per this learn, there is no a way to define the default value through the function caller.
// State is like usual state in useState, it could save object and value.
// action is like flag of operation that changes the state.
const initiateState = { count: 0, showCounter: true };
const reducer = (state = initiateState, action) => {
  console.log('action', action);
  console.log('state', state);
  switch (action.type) {
    // fixme known problem: what happen if there are will be a lot of actions?
    case 'increment':// fixme known problem: better use somehing like enum or constant in case of typos in larger files
      return {
        ...state, // fixme known problem: best practice to override the previous state then use same object, because Javascript behind the screen use object reference
        count: state.count + 1
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1
      };
    case 'increase':
      return {
        ...state,
        count: state.count + action.increaseValue
      };
    case 'toggle':
      return {
        ...state,
        showCounter: !state.showCounter
      };

    default:
      return state;
  }
};

// The known problem could be solved by using redux toolkit
// The createSlice will create a slice of state.
// We can create multiple slice, and in behind redux toolkit will manage the state inside the store.
createSlice({
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
    },
    decrement: (state) => {
      state.count -= 1;
    },
    increase: (state, action) => {
      state.count += action.increaseValue;
    },
    toggle: (state) => {
      state.showCounter = !state.showCounter;
    }
  }
});

// Store is the main object that used by Redux to operate the state.
// Pass the reducer function to createStore.
const store = createStore(reducer);

// Subscribe is aways used to listen the state change.
// const subscriber = () => {
//     console.log(store.getState());
// }
// store.subscribe(subscriber);

// Dispatch is away to give command to change the state.
// Dispatch will pass the action object to reducer function.
// store.dispatch({type: 'increment'});
// store.dispatch({type: 'decrement'});
// store.dispatch({type: 'decrement'});
// store.dispatch({type: 'decrement'});

export default store;
