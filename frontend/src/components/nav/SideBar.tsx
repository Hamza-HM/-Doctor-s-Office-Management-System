// src/components/Navigation/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem, allNavItems } from "./NavItems";

interface SidebarProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobile = false,
  closeMobileMenu,
}) => {
  const location = useLocation();

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => (
      <li key={item.name}>
        <Link
          to={item.path}
          className={location.pathname === item.path ? "active" : ""}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      </li>
    ));

  return (
    <ul className={isMobile ? "mobile-nav-list" : "desktop-nav-list"}>
      {isMobile && renderNavItems(allNavItems.mobileOnly)}
      {isMobile && <div className="nav-mobile-space" />}
      {renderNavItems(allNavItems.desktopAndMobile)}
    </ul>
  );
};
