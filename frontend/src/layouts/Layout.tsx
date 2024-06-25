import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const auth = { isLoggedIn: false };

  return (
    <div>
      {/* Your layout header, navigation, etc. */}
      {auth.isLoggedIn && <p>Welcome, user</p>}{" "}
      {/* Conditional login status display */}
      <main>
        <Outlet />
      </main>
      {/* Your layout footer, etc. */}
    </div>
  );
};

export default Layout;
