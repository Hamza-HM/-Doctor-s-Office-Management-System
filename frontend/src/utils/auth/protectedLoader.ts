import { redirect } from "react-router-dom";

// Simple AuthGuard component

// Simple protectedLoader function
export const protectedLoader = () => {
  const token = localStorage.getItem("accessToken"); // this needs to change
  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};
