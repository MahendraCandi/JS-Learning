import classes from './CartButton.module.css';
import {useSelector} from "react-redux";

const CartButton = (props) => {
  const carts = useSelector(state => state.carts.carts);
  return (
    <button className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{carts.length}</span>
    </button>
  );
};

export default CartButton;
