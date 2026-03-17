import {useParams} from "react-router-dom";

const ProductDetailPage = () => {
  const params = useParams();
  return (
    <>
      <h1>Product detail</h1>
      <p>Product ID {params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
