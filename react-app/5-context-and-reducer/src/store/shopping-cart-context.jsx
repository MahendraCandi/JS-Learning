import {createContext, useReducer} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

// Create a new context object.
// Default value inside this context is used as auto-complete for later when we call the value of this context.
// The real value will be passed when we wrap components using this context.
//
// This is the example of how the real values will be passed:
// <CartContext.Provider value={ { items: [] } }>
// ...
// </CartContext.Provider>
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemInCart: () => {}
});

/**
 * Function represent the useReducer. This function will be triggered by `dispatch` function by `useReducer`.
 * @param shoppingCartState The state value. Guarantee to be always the latest state by React `useReducer`.
 * @param action The object would be proceeded by this function.
 *                Should have `type` property and `payload` to determine which action and what data is passed.
 */
const shoppingCartReducer = (shoppingCartState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const updatedItems = [...shoppingCartState.items];

      const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
        updatedItems.push({
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...shoppingCartState,
        items: updatedItems,
      };
    }
    case 'UPDATE_ITEM_IN_CART': {
      const updatedItems = [...shoppingCartState.items];
      const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...shoppingCartState,
        items: updatedItems,
      };
    }
  }
}

// By using this we can has a single responsibility for the context provider.
export default function CartContextProvider({children}) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []})

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM_TO_CART',
      payload: {
        id
      }
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM_IN_CART',
      payload: {
        productId,
        amount
      }
    });
  }

  const cartCtx = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemInCart: handleUpdateCartItemQuantity,
  }

  return (
    <CartContext.Provider value={ cartCtx }>
      {children}
    </CartContext.Provider>
  );
}