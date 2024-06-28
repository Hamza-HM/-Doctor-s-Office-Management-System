// src/components/Navigation/MobileNav.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { allNavItems } from "./NavItems";
import { Sidebar } from "./SideBar";
import { NavIcon } from "./NavIcon";

export const MobileNav: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".nav-icon")) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getCurrentPageTitle = () => {
    const allItems = [
      ...allNavItems.mobileOnly,
      ...allNavItems.desktopAndMobile,
    ];
    const currentItem = allItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem?.name || "Healthy 24";
  };

  return (
    <>
      <div className="mobile-nav">
        <FaBars
          className="burger-open-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        />
        <div className="current-page">{getCurrentPageTitle()}</div>
        <NavIcon
          icon={<FaBell />}
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
          dropdownContent="Notifications"
          closeOthers={() => {}} // No other dropdowns to close in mobile view
        />
      </div>

      <div
        className={`mobile-sidebar-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      >
        <div
          className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-sidebar-header">
            <BiMenuAltLeft
              className="burger-close-icon"
              onClick={closeMobileMenu}
            />
            <div className="logo">Healthy 24</div>
          </div>
          <Sidebar isMobile={true} closeMobileMenu={closeMobileMenu} />
        </div>
      </div>
    </>
  );
};
