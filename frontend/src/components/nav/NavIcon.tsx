import { ReactNode, useRef } from "react";

interface NavIconProps {
  icon: React.ReactElement;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dropdownContent: ReactNode;
  closeOthers: () => void;
}

export const NavIcon: React.FC<NavIconProps> = ({
  icon,
  isOpen,
  setIsOpen,
  dropdownContent,
  closeOthers,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <div className="nav-icon" ref={iconRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            closeOthers();
          }
          setIsOpen(!isOpen);
        }}
      >
        {icon}
      </div>
      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-content">{dropdownContent}</div>
        </div>
      )}
    </div>
  );
};
