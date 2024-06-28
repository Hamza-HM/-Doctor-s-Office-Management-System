import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCog, FaUser } from "react-icons/fa";
import useLogoutLogic from "@src/hooks/useLogoutLogic";
import { NavIcon } from "./NavIcon";

export const DesktopNav: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { handleSubmit } = useLogoutLogic();

  const closeAllDropdowns = () => {
    setIsNotificationOpen(false);
    setIsSettingsOpen(false);
    setIsProfileOpen(false);
  };

  const closeOthers = (exceptSetter: (isOpen: boolean) => void) => {
    if (setIsNotificationOpen !== exceptSetter) setIsNotificationOpen(false);
    if (setIsSettingsOpen !== exceptSetter) setIsSettingsOpen(false);
    if (setIsProfileOpen !== exceptSetter) setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".nav-icon")) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="desktop-nav">
      <h1 className="logo">Healthy 24.</h1>
      <div className="nav-icons">
        <NavIcon
          icon={<FaBell />}
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
          dropdownContent="Notifications"
          closeOthers={() => closeOthers(setIsNotificationOpen)}
        />
        <NavIcon
          icon={<FaCog />}
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          dropdownContent="Settings"
          closeOthers={() => closeOthers(setIsSettingsOpen)}
        />
        <NavIcon
          icon={<FaUser />}
          isOpen={isProfileOpen}
          setIsOpen={setIsProfileOpen}
          dropdownContent={
            <>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <p className="dropdown-item" onClick={handleSubmit}>
                Logout
              </p>
            </>
          }
          closeOthers={() => closeOthers(setIsProfileOpen)}
        />
      </div>
    </div>
  );
};
