import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Products /> },
        { path: "/About", element: <About /> },
<<<<<<< HEAD
=======
        { path: "/products", element: <Products /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
>>>>>>> a497282b2889d193b6136b2a552030f1dcc21925
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
