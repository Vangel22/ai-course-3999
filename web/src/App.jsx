import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Error } from "./pages/Error";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <h1>Login</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
