import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";

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
      }
    ],
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
