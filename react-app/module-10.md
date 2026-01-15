# Module 10, Context API & useReducer Hook

## Context API

Context API used to share data accross components without having to pass props down manually from parent to child components.
The idea is by act as a "wrapper" to wrap components, this wrapper can be used to stored states that can be accessed by all components.

Usually, we use lifting state up and prop drilling to pass data from parent to child components.

<img alt="mod-10-lifting-state-and-prop-drilling.png" src="img/mod-10-lifting-state-and-prop-drilling.png" width="700"/>

However, what if there are many nested components and we want to share data from a deep component to another?
If we use prop drilling, it will be very tedious to pass data from deep component to parent component.

In this case, we can use Context API.

<img alt="mod-10-context-illustration.png" src="img/mod-10-context-illustration.png" width="700"/>

From illustration above, we can see that Context API can be used in close children or in distant children.

### Create context

```javascript
// somewhere in a file
import {createContext} from "react";

export const CartContext  = createContext({
    items: [],
});


// somewhere in another file
<CartContext.Provider value={ { items: [] } }>
    <Header/>
    <Shop />
</CartContext.Provider>
```

From above code example, we use context API to wrap Header and Shop components.
Later, we can access the context item from deep inside in both Header and Shop components.

### Consume context

To consume the context, we can call `useContext` hook and pass the context object as parameter in any component inside the context;

```javascript
import {CartContext} from "...";
import {useContext} from "react";

export default function Cart({ ... }) {
  const {items} = useContext(CartContext);

  return (
    <div>
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (...)}
    </div>
  );
}

```

### Complete looks of using Context

> By using Context API, we don't have to pass props down manually from parent to child components.

```javascript
// ./store/shopping-cart-context.jsx
// It is a common practice to create context object in a separate file.
// Usually, this file is placed inside a package named 'store'.
import {createContext} from "react";

// Default value inside this context is used as auto-complete for later when we call the value of this context.
// The real value will be passed when we wrap components using this context.
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemInCart: () => {}
});
```

```javascript
// main app file
// See how the Context object wrapped the Header and Shop components.
// Notice the property 'value' inside the Context.Provider component, which is the real value of this context.
function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {};
  function handleUpdateCartItemQuantity(productId, amount) {};

  // Initalize the value of this context.
  const cartCtx = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemInCart: handleUpdateCartItemQuantity,
  }

  return (
    <CartContext.Provider value={ cartCtx }>
      <Header/>
      <Shop/>
    </CartContext.Provider>
  );
}
```

```javascript
// Using items and updateItemInCart from context.
export default function Cart() {
    const { items, updateItemInCart } = useContext(CartContext);
    // ...
    return (
        <div id="cart">
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
                <ul id="cart-items">
                    {items.map((item) => {
                        const formattedPrice = `$${item.price.toFixed(2)}`;

                        return (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <span> ({formattedPrice})</span>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => updateItemInCart(item.id, -1)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateItemInCart(item.id, 1)}>
                                        +
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
```

### Single responsibility principle for states used in Context API

Move all the states management logic into the context object.

```javascript
// ./store/shopping-cart-context.jsx
// By using this we can has a single responsibility for the context provider.

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemInCart: () => {}
});

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
```

```javascript
// main app file
function App() {
    return (
        <CartContextProvider>
            <Header/>
            <Shop/>
        </CartContextProvider>
    );
}
```