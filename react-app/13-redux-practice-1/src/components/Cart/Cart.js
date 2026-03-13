import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux";

const Cart = (props) => {
  const carts = useSelector(state => state.carts.carts);
  return (
    <Card className={classes.cart}>
      {
        carts.length > 0 ?
          <>
            <h2>Your Shopping Cart</h2>
            {
              carts.map(cart =>
                <ul key={cart.product.title}>
                  <CartItem
                    item={{title: cart.product.title, quantity: cart.quantity, total: cart.total, price: cart.product.price}}
                  />
                </ul>
              )
            }
          </>
          : <h2>Cart is empty</h2>
      }
    </Card>
  );
};

export default Cart;
