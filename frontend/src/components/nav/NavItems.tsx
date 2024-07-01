// src/components/Navigation/NavItems.ts
import {
  FaUser,
  FaThermometerHalf,
  FaListAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaHistory,
  FaBell,
  FaCog,
} from "react-icons/fa";

export interface NavItem {
  icon: JSX.Element;
  name: string;
  path: string;
}

// Corrected interface definition
export interface AllNavItems {
  mobileOnly: NavItem[];
  desktopAndMobile: NavItem[];
}

// Updated data with unique paths for clarity
export const allNavItems: AllNavItems = {
  mobileOnly: [
    { icon: <FaUser />, name: "Profile", path: "/profile" },
    { icon: <FaBell />, name: "Notifications", path: "/notifications" },
    { icon: <FaCog />, name: "Settings", path: "/settings" },
  ],
  desktopAndMobile: [
    { icon: <FaThermometerHalf />, name: "Dashboard", path: "/" },
    { icon: <FaListAlt />, name: "Patients List", path: "/patients" },
    { icon: <FaEnvelope />, name: "Messages", path: "/messages" },
    { icon: <FaCalendarAlt />, name: "Appointment", path: "/appointments" },
    { icon: <FaHistory />, name: "Medical History", path: "/history" },
  ],
};
