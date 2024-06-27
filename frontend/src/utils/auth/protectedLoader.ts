import { redirect } from "react-router-dom";

// Simple AuthGuard component

// Simple protectedLoader function
export const protectedLoader = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") !== "";
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }
  return null;
};
