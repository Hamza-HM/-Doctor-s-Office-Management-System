// src/components/Navigation/index.tsx
import React from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import "./nav.css";

export const Navigation: React.FC = () => {
  return (
    <nav>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
};

export default Navigation;
