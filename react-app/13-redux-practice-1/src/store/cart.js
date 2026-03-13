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
 *       quantity: 0
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
        state.carts.push({product: payload.payload, quantity: 1});
        console.log('add', current(state.carts));
      }
    },
    incrementQuantity: (state, payload) => {
      const index = findProductIndexInCart(state.carts, payload.payload.title);
      if (index > -1) {
        state.carts[index].quantity++;
        console.log('incrementQuantity', current(state.carts));
      }
    },
    decrementQuantity: (state, payload) => {
      const index = findProductIndexInCart(state.carts, payload.payload.title);
      if (index > -1) {
        state.carts[index].quantity--;
        console.log('decrementQuantity', current(state.carts));
      }
    },
    removeProduct: (state, payload) => {
      state.carts = state.carts.filter(p => p.product.title !== payload.payload.title);
      console.log('removeProduct', current(state.carts));
    },
  }
});

export const cartActions = cartSlice.actions;
