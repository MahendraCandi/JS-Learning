import {createSlice, current} from "@reduxjs/toolkit";

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
    replaceCarts: (state, payload) => {
      state.carts = payload.payload;
    },
  }
});

export const cartActions = cartSlice.actions;
