// In real project, we should use redux toolkit
// For learning purpose, it safe to use the legacy version
import { legacy_createStore as createStore } from 'redux';

// Please notice that the default value defined in the parameter.
// Per this learn, there is no a way to define the default value through the function caller.
// State is like usual state in useState, it could save object and value.
// action is like flag of operation that changes the state.
const reducer = (state = { count: 0 }, action) => {
  console.log('action', action);
  console.log('state', state);
  if (action.type === 'increment') {
    return { count: state.count + 1 };
  } else if (action.type === 'decrement') {
    return { count: state.count - 1 };
  } else {
    return state;
  }
};

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
