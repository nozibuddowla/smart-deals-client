import AllProducts from "../components/AllProducts/AllProducts";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import MyProducts from "../components/MyProducts/MyProducts";
import Register from "../components/Register/Register";
import RootLayout from "../layouts/RootLayout";
import { createBrowserRouter } from "react-router";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import HydrationFallback from "../components/HydrationFallback/HydrationFallback";
import CreateProduct from "../components/CreateProduct/CreateProduct";
import PrivateRouter from "./PrivateRoute";
import MyBids from "../components/MyBids/MyBids";

// Helper function for API calls with error handling
const fetchWithErrorHandling = async (url) => {
  // console.log("Fetching URL:", url);

  const response = await fetch(url);

  // console.log("Response status:", response.status);
  // console.log("Response OK:", response.ok);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}, URL: ${url}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Non-JSON response:", text.substring(0, 200));
    throw new TypeError(`Response is not JSON from ${url}`);
  }

  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    hydrateFallbackElement: <HydrationFallback />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        loader: () =>
          fetchWithErrorHandling(`${import.meta.env.VITE_API_URL}/products`),
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
        path: "/createProduct",
        element: (
          <PrivateRouter>
            <CreateProduct />
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
          fetchWithErrorHandling(
            `${import.meta.env.VITE_API_URL}/products/${params.id}`
          ),
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
