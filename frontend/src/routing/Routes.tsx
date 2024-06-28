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
import { protectedLoader } from "@src/utils/auth/protectedLoader";
import MedicalHistory from "@src/pages/dashboard/MedicalHistory";
import PatientsList from "@src/pages/dashboard/PatientsList";
import Messages from "@src/pages/dashboard/Messages";
import Profile from "@src/pages/dashboard/Profile";
import AuthLayout from "@src/layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    loader: protectedLoader,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "history",
        element: <MedicalHistory />,
      },
      {
        path: "patients",
        element: <PatientsList />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
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
