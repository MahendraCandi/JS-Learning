import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";

const Counter = () => {
  // useSelector to get the state from the store.
  const counter = useSelector(state => state.count);
  const isShowCounter = useSelector(state => state.showCounter);

  // useDispatch to get dispatch function that used to dispatch an action.
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({type: 'increment'});
  };

  const increaseHandler = () => {
    dispatch({type: 'increase', increaseValue: 5});
  }

  const decrementHandler = () => {
    dispatch({type: 'decrement'});
  };

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'});
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {
        isShowCounter && <div className={classes.value}>{counter}</div>
      }
      <div className={classes.operations}>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
