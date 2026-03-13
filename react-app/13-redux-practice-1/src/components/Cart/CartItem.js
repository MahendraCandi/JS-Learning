import classes from './CartItem.module.css';
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  const incrementHandler = () => {
    dispatch(cartActions.incrementQuantity({ title }))
  }

  const decrementHandler = () => {
    dispatch(cartActions.decrementQuantity({ title }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
