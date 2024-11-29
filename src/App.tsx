import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Products /> },
        { path: "/About", element: <About /> },
        { path: "/products", element: <Products /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },
  ]);

  return <RouterProvider router={router}>

  </RouterProvider>;
}

export default App;
