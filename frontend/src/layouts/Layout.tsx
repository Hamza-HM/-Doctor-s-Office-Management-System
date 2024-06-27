import { RootState } from "@src/store";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const { isAuthenticated, loading, email } = useSelector<
    RootState,
    RootState["auth"]
  >((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Your layout header, navigation, etc. */}
      {isAuthenticated === true && <p>Welcome, {email}</p>}{" "}
      {/* Conditional login status display */}
      <main>
        <Outlet />
      </main>
      {/* Your layout footer, etc. */}
    </div>
  );
};

export default Layout;
