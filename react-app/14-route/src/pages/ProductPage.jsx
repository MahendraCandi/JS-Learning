import {Link} from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
];

const ProductPage = () => {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {/*
        There are two approaches to create link for path parameter:
        1. absolute path.
           defined full path using slash as first character followed by the path: '/products/1'
           example: <li><Link to={'/products/1'}>Product 1</Link></li>
        2. relative path.
           without full path only the path parameter.
           example: <li><Link to={'1'}>Product 1</Link></li>
        */}

        {
          PRODUCTS.map(product => (
            <li key={product.id}><Link to={`${product.id}`}>{product.name}</Link></li>
          ))
        }

      </ul>
    </>
  );
}
export default ProductPage;
