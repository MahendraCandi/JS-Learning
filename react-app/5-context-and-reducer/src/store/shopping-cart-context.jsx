import {createContext, useReducer} from "react";
import {shoppingCartReducer} from "./shopping-cart-reducer.jsx";

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