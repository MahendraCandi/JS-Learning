import {uiActions} from "./ui-slice";
import {cartActions} from "./cart";

const FIREBASE_URL = 'https://react-js-learning-a6947-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json';

// Solution to send cart data to backend.
// A thunk function that will be dispatched to the store.
// Thunk function is a function that returns a function.
// So instead dispatch an action, we dispatch a thunk function.
export const sendCartChanges = (carts) => {
  return async (dispatch) => {
    dispatch(uiActions.pushNotification(
      {status: 'pending', title: 'Sending...', message: 'Sending cart data'}));

    const sendCarts = async () => {
      const resp = await fetch(FIREBASE_URL,
        {
          method: 'PUT',
          body: JSON.stringify(carts),
        });

      if (!resp.ok) {
        throw new Error('Failed to send carts');
      }

      dispatch(uiActions.pushNotification({
        status: 'success',
        title: 'Carts sent successfully',
        message: 'Your carts are saved.'
      }));
    }

    try {
      await sendCarts();
    } catch (error) {
      console.log(error);
      dispatch(uiActions.pushNotification({status: 'error', title: 'Error!', message: error.message}));
    }
  };
}

export const fetchCarts = () => {
  return async (dispatch) => {
    const resp = await fetch(FIREBASE_URL);

    if (!resp.ok) {
      throw new Error('Failed fetch carts');
    }

    try {
      const carts = await resp.json() || [];
      dispatch(cartActions.replaceCarts(carts));
    } catch (error) {
      console.log(error);
      dispatch(uiActions.pushNotification({status: 'error', title: 'Error!', message: error.message}));
    }
  };
}
