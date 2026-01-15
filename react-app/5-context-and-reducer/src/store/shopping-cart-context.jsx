import {createContext, useState} from "react";
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

// By using this we can has a single responsibility for the context provider.
export default function CartContextProvider({children}) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const cartCtx = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemInCart: handleUpdateCartItemQuantity,
  }

  return (
    <CartContext.Provider value={ cartCtx }>
      {children}
    </CartContext.Provider>
  );
}