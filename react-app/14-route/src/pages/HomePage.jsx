import {Link, useNavigate} from "react-router-dom";

const HomePage = () => {

  // useNavigate useful to create a Link programmatically.
  const navigate = useNavigate();
  return (
    <>
      <h1>Home Page</h1>
      <p>Please visit this link <Link to={"/products"}>products</Link> </p>

      {/*demonstrate useNavigate programmatically creating a Link. The real application should use Link component*/}
      <button onClick={() => navigate("/products")}>Go to Products</button>
    </>

  );
}

export default HomePage;
