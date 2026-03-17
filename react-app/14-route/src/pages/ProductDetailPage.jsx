import {Link, useParams} from "react-router-dom";

const ProductDetailPage = () => {
  const params = useParams();
  return (
    <>
      <h1>Product detail</h1>
      <p>Product ID {params.productId}</p>
      <p>
        {/*
        The double dot is used to go back to the parent route.
        Similar to Linux directory structure.

        'relative' property is used to looking where link should go back.
        If it is 'path' then will relative to the previous path.
        Example: `/products/1` -> will be back to `/products`

        If it is 'route' then will back to path and children route.
        Example: `/products/1` -> By looking this application route setup, it will be back to `/`
        */}
        <Link to={'..'} relative={'path'}>Back</Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
