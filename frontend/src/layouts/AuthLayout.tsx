import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <>
      <main className="auth-layout">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
