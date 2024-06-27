import useLogoutLogic from "@src/hooks/useLogoutLogic";
import { RootState } from "@src/store";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const { isAuthenticated, email } = useSelector<RootState, RootState["auth"]>(
    (state: RootState) => state.auth
  );
  const { handleSubmit } = useLogoutLogic();

  return (
    <div>
      {isAuthenticated === true && <p>Welcome, {email}</p>}
      {/* Conditional login status display */}
      {isAuthenticated === true && (
        <button onClick={handleSubmit}>Logout</button>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
