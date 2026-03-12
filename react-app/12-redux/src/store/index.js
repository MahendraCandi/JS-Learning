// In real project, we should use redux toolkit
// For learning purpose, it safe to use the legacy version
// import { legacy_createStore as createStore } from 'redux';
import {configureStore} from "@reduxjs/toolkit";
import {counterSlice} from "./counter-slice";

// Please notice that the default value defined in the parameter.
// Per this learn, there is no a way to define the default value through the function caller.
// State is like usual state in useState, it could save object and value.
// action is like flag of operation that changes the state.
/**
const initiateState = { count: 0, showCounter: true };
const reducer = (state = initiateState, action) => {
  console.log('action', action);
  console.log('state', state);
  switch (action.type) {
    case 'increment':
      return {
        ...state,
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
*/

// Store is the main object that used by Redux to operate the state.
// Pass the reducer function to createStore.
/*
const store = createStore(reducer);
*/

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

/*
export default store;
*/

// all reducer need to be register to the store.
// redux toolkit will do this by using configureStore.
export const store = configureStore({
  reducer: counterSlice.reducer // register all reducers that counterSlice had

  // if there are multiple slice, we can register them like this:
  // reducer: {
  //   counter: counterSlice.reducer
  // }
});
