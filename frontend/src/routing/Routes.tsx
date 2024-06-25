import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import { protectedLoader } from "../utils/auth/protectedLoader";

import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Appointments from "../pages/dashboard/Appointments";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // Add other unprotected routes here
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    loader: protectedLoader,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
