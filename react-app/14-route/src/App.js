import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // this path and element inside children only works when the path is '/' and under element Root
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      }
    ],
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
