import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import "./auth.css";
import AuthLayout from "@src/components/sections/auth/AuthLayout";
import AuthHeader from "@src/components/sections/auth/AuthHeader";
import ResetPasswordForm from "@src/forms/ResetPasswordForm";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { error, success } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  return (
    <AuthLayout>
      <AuthHeader
        title="Forget Password"
        subtitle="Enter your email to recover password"
        imageSrc="/images/lock-emoji.png"
        imageAlt="lock emoji"
      />
      {error && <span className="error">{error}</span>}
      {success && <span className="success">{success}</span>}
      <ResetPasswordForm />
      <p className="login-link">
        Go to <Link to="/auth/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;
