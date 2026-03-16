import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {sendCartChanges} from "./store/cart";

// Workaround to avoid sending empty data to Firebase whenever the app start.
let isInitialRun = true;

function App() {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.uis.openCart);
  const carts = useSelector(state => state.carts.carts);
  const notification = useSelector(state => state.uis.notification);

  useEffect(() => {
    console.log('useEffect - carts changed', carts);
    if (isInitialRun) {
      isInitialRun = false;
      return;
    }

    // Dispatching Thunk function to send data to Firebase before execute Redux reducer function.
    dispatch(sendCartChanges(carts));
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
