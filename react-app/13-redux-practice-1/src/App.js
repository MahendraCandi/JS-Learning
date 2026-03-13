import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";

function App() {
  const isOpenCart = useSelector(state => state.uis.openCart);
  return (
    <Layout>
      {isOpenCart ? <Cart/> : undefined}
      <Products />
    </Layout>
  );
}

export default App;
