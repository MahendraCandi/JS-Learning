import {Link} from "react-router-dom";

const ProductPage = () => {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        <li><Link to={'1'}>Product 1</Link></li>
        <li><Link to={'2'}>Product 2</Link></li>
        <li><Link to={'3'}>Product 3</Link></li>
      </ul>
    </>
  );
}
export default ProductPage;
