import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Error } from "./pages/Error";
import Root from "./Root";
import ProtectedRoute from "./components/ProtectedRoute";
import { Homepage } from "./pages/Homepage";
import { SoilChat } from "./pages/SoilChat";
import { Login } from "./pages/Login";
import { Users } from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     { index: true, element: <Homepage /> },
      //     { path: "/soil-chat", element: <SoilChat /> },
      //   ],
      // },
      {
        element: <ProtectedRoute requiredRole="admin" />,
        children: [{ path: "/users", element: <Users /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
