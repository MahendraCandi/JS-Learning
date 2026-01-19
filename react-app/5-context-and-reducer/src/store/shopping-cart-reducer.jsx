import {DUMMY_PRODUCTS} from "../dummy-products.js";

/**
 * Function represent the useReducer. This function will be triggered by `dispatch` function by `useReducer`.
 * @param shoppingCartState The state value. Guarantee to be always the latest state by React `useReducer`.
 * @param action The object would be proceeded by this function.
 *                Should have `type` property and `payload` to determine which action and what data is passed.
 */
export const shoppingCartReducer = (shoppingCartState, action) => {
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