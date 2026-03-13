import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/*todo make CartItem dynamic from Cart store*/}
        <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        />
        <CartItem
          item={{ title: 'Bucket', quantity: 10, total: 99, price: 9 }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
