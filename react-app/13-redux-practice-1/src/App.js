import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {uiActions} from "./store/ui-slice";

// Workaround to avoid sending empty data to Firebase whenever the app start.
let isInitialRun = true;

function App() {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.uis.openCart);
  const carts = useSelector(state => state.carts.carts);
  const notification = useSelector(state => state.uis.notification);

  // use useEffect to interact with external API, then state the changes to Redux.
  // This approach has a bug which is whenever the app start, useEffect will trigger and will send empty data to Firebase.
  // As a result, the existing data will be overwritten by the empty data.
  //
  // This could be fixed by creating a variable outside the component. Please see variable "isInitialRun" in the code.
  useEffect(() => {
    console.log('useEffect - carts changed', carts);

    dispatch(uiActions.pushNotification({status: 'pending', title: 'Sending...', message: 'Sending cart data'}));

    const sendCarts = async () => {
      const resp = await fetch('https://react-js-learning-a6947-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(carts),
        });

      if (!resp.ok) {
        throw new Error('Failed to send carts');
      }

      dispatch(uiActions.pushNotification({status: 'success', title: 'Carts sent successfully', message: 'Your carts are saved.'}));
    }

    if (isInitialRun) {
      isInitialRun = false;
      return;
    }

    sendCarts().catch(error => {
      dispatch(uiActions.pushNotification({status: 'error', title: 'Error!', message: error.message}));
    });

  }, [carts, dispatch]);

  return (
    <Layout>
      {notification &&
        <Notification status={notification.status}
                      title={notification.title}
                      message={notification.message} />}
      {isOpenCart ? <Cart/> : undefined}
      <Products />
    </Layout>
  );
}

export default App;
