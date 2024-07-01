import { Sidebar } from "@src/components/nav/SideBar";
import Navigation from "@src/components/nav/index";
import React from "react";
import { Outlet } from "react-router-dom";

import "./layouts.css";

const DashboardLayout: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="dashboard-container">
        <div className="desktop-sidebar">
          <Sidebar isMobile={false} />
        </div>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
