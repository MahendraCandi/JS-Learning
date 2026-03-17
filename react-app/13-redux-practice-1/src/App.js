import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {fetchCarts, sendCartChanges} from "./store/cart-thunk";

// Workaround to avoid sending empty data to Firebase whenever the app start.
let isInitialRun = true;

function App() {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.uis.openCart);
  const carts = useSelector(state => state.carts.carts);
  const isCartsChanged = useSelector(state => state.carts.isChanged);
  const notification = useSelector(state => state.uis.notification);

  useEffect(() => {
    console.log('useEffect - app start');
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    console.log('useEffect - carts changed', carts);
    console.log('useEffect - is changed', isCartsChanged);
    if (isInitialRun) {
      isInitialRun = false;
      return;
    }

    if (isCartsChanged) {
      // Dispatching Thunk function to send data to Firebase before execute Redux reducer function.
      dispatch(sendCartChanges(carts));
    }

  }, [carts, isCartsChanged, dispatch]);

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
