import React from "react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="auth-form-header">
      <div className="row gap-20">
        <h1>{title}</h1>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <p>{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
