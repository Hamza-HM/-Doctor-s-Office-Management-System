import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

import "./auth.css";
import AuthLayout from "@src/components/sections/auth/AuthLayout";
import SocialLogin from "@src/components/sections/auth/SocialLogin";
import useLoginLogic from "@src/hooks/useLoginLogic";
import LoginForm from "@src/forms/LoginForm";
import AuthHeader from "@src/components/sections/auth/AuthHeader";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { loading, error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const { handleSubmit } = useLoginLogic();

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome To Healthy 24"
        subtitle="Enter your account to use healthy 24 service"
        imageSrc="/images/all-good-emoju.png"
        imageAlt="waving hand emoji"
      />
      {error && <span className="error">{error}</span>}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      <div className="divider">or</div>
      <SocialLogin loading={loading} buttonText="Sign in" />
      <p className="login-link">
        You don't have an account? <Link to="/auth/signup">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
