import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa";
import useLogoutLogic from "@src/hooks/useLogoutLogic";
import { NavIcon } from "./NavIcon";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

export const DesktopNav: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { handleSubmit } = useLogoutLogic();
  const navigate = useNavigate();

  const { profile } = useSelector<RootState, RootState["user"]>(
    (state) => state.user
  );
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

  const handleRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="desktop-nav">
      <h1 className="logo" onClick={handleRedirect}>
        Healthy 24.
      </h1>
      <div className="nav-icons">
        <NavIcon
          icon={<FaBell />}
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
          dropdownContent={
            <Link className="dropdown-item" to="/profile">
              Notification
            </Link>
          }
          closeOthers={() => closeOthers(setIsNotificationOpen)}
        />
        <NavIcon
          icon={<FaCog />}
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          dropdownContent={
            <Link className="dropdown-item" to="/profile">
              Settings
            </Link>
          }
          closeOthers={() => closeOthers(setIsSettingsOpen)}
        />
        <NavIcon
          icon={
            <img
              className="nav-avatar"
              src={
                profile?.avatar
                  ? profile?.avatar
                  : "/images/profile-avatar-img.png"
              }
              alt="Avatar"
              onClick={() => navigate("/profile")}
            />
          }
          dropdownContent={
            <>
              <p className="dropdown-item" onClick={handleSubmit}>
                Logout
              </p>
            </>
          }
          isOpen={isProfileOpen}
          setIsOpen={setIsProfileOpen}
          closeOthers={() => closeOthers(setIsProfileOpen)}
        />
      </div>
    </div>
  );
};
