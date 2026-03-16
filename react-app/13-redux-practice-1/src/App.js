import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
  const isOpenCart = useSelector(state => state.uis.openCart);
  const carts = useSelector(state => state.carts.carts);

  // use useEffect to interact with external API, then state the changes to Redux.
  // This approach has a bug which is whenever the app start, useEffect will trigger and will send empty data to Firebase.
  // As a result, the existing data will be overwritten by the empty data.
  useEffect(() => {
    console.log('carts changed', carts);
    fetch('https://react-js-learning-a6947-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
      {
        method: 'PUT',
        body: JSON.stringify(carts),
      })
    .then(response => response.json())
    .then(data => console.log('Success:', data));
  }, [carts]);

  return (
    <Layout>
      {isOpenCart ? <Cart/> : undefined}
      <Products />
    </Layout>
  );
}

export default App;
