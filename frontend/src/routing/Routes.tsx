import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "./AuthGuard";
// import { protectedLoader } from "../utils/auth/protectedLoader";

import SignUp from "@src/pages/auth/Signup";
import Layout from "@src/layouts/Layout";
import Home from "@src/pages/home/Home";
import Dashboard from "@src/pages/dashboard/Dashboard";
import Appointments from "@src/pages/dashboard/Appointments";
import Login from "@src/pages/auth/Login";
import ResetPassword from "@src/pages/auth/ResetPassword";
import ConfirmPasswordReset from "@src/pages/auth/ConfirmPasswordReset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    // loader: protectedLoader,
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
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "confirm-reset-password",
        element: <ConfirmPasswordReset />,
      },
    ],
  },
]);

export default router;
