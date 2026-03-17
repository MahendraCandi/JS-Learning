import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>Please visit this link <Link to={"/products"}>products</Link> </p>
    </>

  );
}

export default HomePage;
