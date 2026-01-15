import {createContext} from "react";

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
