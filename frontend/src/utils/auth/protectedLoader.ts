import { redirect } from "react-router-dom";

const isAuthenticated = false;

// Simple AuthGuard component

// Simple protectedLoader function
export const protectedLoader = () => {
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }
  return null;
};
