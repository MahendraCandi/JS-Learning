import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//   },
//   {
//     path: 'product',
//     element: <ProductPage />,
//   }
// ]);

// another way to create route path
const routesDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="product" element={<ProductPage />} />
  </Route>
);

const router = createBrowserRouter(routesDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
