// src/components/Navigation/index.tsx
import React from "react";
import { DesktopNav } from "./DesktopNav";
import { Sidebar } from "./SideBar";
import { MobileNav } from "./MobileNav";
import "./nav.css";

export const Navigation: React.FC = () => {
  return (
    <nav>
      <DesktopNav />
      <div className="desktop-sidebar">
        <Sidebar isMobile={false} />
      </div>
      <MobileNav />
    </nav>
  );
};

export default Navigation;
