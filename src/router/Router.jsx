import AllProducts from "../components/AllProducts/AllProducts";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import MyBids from "../components/MyBids/MyBids";
import MyProducts from "../components/MyProducts/MyProducts";
import Register from "../components/Register/Register";
import RootLayout from "../layouts/RootLayout";
import { createBrowserRouter } from "react-router";
import PrivateRouter from "./PrivateRouter";
import ProductDetails from "../components/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRouter>
            <MyProducts />
          </PrivateRouter>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRouter>
            <MyBids />
          </PrivateRouter>
        ),
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
]);

export default router;
