import {createSlice, current} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const FIREBASE_URL = 'https://react-js-learning-a6947-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json';

/**
 * <pre>
 *   {
 *   carts: [
 *     {
 *       product: {
 *         title: '',
 *         price: 0,
 *         description: '',
 *       },
 *       quantity: 0,
 *       total: 0,
 *     }
 *   ]
 * }
 * </pre>
 * @type {{carts: *[]}}
 */
const initialState = {
  carts: []
};

const matchProductPredicate = (title) => {
  return (cart) => cart.product.title === title;
}

const findProductIndexInCart = (carts, title) => {
  return carts.findIndex(matchProductPredicate(title));
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, payload) => {
      if (findProductIndexInCart(state.carts, payload.payload.title) < 0) {
        state.carts.push({
          product: payload.payload,
          quantity: 1,
          total: payload.payload.price
        });
        console.log('add', current(state.carts));
      }
    },
    incrementQuantity: (state, payload) => {
      const index = findProductIndexInCart(state.carts, payload.payload.title);
      if (index > -1) {
        const cartItem = state.carts[index];
        cartItem.quantity += 1 ;
        cartItem.total = cartItem.product.price * cartItem.quantity;
        console.log('incrementQuantity', current(state.carts));
      }
    },
    decrementQuantity: (state, payload) => {
      const index = findProductIndexInCart(state.carts, payload.payload.title);
      if (index > -1) {
        const cartItem = state.carts[index];
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1 ;
          cartItem.total = cartItem.product.price * cartItem.quantity;
        } else {
          // remove product from cart
          state.carts.splice(index, 1);
        }
        console.log('decrementQuantity', current(state.carts));
      }
    },
    removeProduct: (state, payload) => {
      const index = findProductIndexInCart(state.carts, payload.payload.title);
      if (index > -1) {
        state.carts.splice(index, 1);
        console.log('removeProduct', current(state.carts));
      }
    },
  }
});

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

      dispatch(uiActions.pushNotification({status: 'success', title: 'Carts sent successfully', message: 'Your carts are saved.'}));
    }

    try {
      await sendCarts();
    } catch (error) {
      dispatch(uiActions.pushNotification({status: 'error', title: 'Error!', message: error.message}));
    }
  };
}

export const cartActions = cartSlice.actions;
