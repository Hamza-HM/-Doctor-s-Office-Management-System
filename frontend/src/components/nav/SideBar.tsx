// src/components/Navigation/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem, allNavItems } from "./NavItems";
import useLogoutLogic from "@src/hooks/useLogoutLogic";
import { IoIosLogOut } from "react-icons/io";

interface SidebarProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobile = false,
  closeMobileMenu,
}) => {
  const { handleSubmit } = useLogoutLogic();
  const location = useLocation();

  const handleActiveLink = (item: NavItem) => {
    let isActive = location.pathname === item.path;

    if (location.pathname.startsWith("/patient-detail/")) {
      isActive = item.path === "/patients" || item.path === "/patient-detail";
    }

    return isActive;
  };

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => (
      <li key={item.name}>
        <Link
          to={item.path}
          className={`${handleActiveLink(item) ? "active" : ""}`}
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
      {isMobile && (
        <div className="mobile-logout">
          <IoIosLogOut />
          <p onClick={handleSubmit}>Logout</p>
        </div>
      )}
    </ul>
  );
};
