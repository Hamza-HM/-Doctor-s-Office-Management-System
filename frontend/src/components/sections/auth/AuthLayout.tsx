import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className="signup-container">
    <div className="signup-form-container">
      <div className="signup-form-inner">{children}</div>
    </div>
    <div className="signup-info-container">
      <img
        src="/images/auth-side-img.png"
        alt="Feature"
        className="feature-image"
      />
    </div>
  </div>
);

export default AuthLayout;
