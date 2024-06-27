import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import "./auth.css";
import AuthHeader from "@src/components/sections/auth/AuthHeader";
import SignUpForm from "@src/forms/SignupForm";
import SocialLogin from "@src/components/sections/auth/SocialLogin";
import AuthLayout from "@src/components/sections/auth/AuthLayout";
import useSignUpLogic from "@src/hooks/useSignupLogic";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const { loading, error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const { handleSubmit } = useSignUpLogic();

  return (
    <AuthLayout>
      <AuthHeader
        title="Sign up your account"
        subtitle="Let's Enter your data to continue use healthy 24 services"
        imageSrc="/images/wave-emoji.png"
        imageAlt="waving hand emoji"
      />
      {error && <span className="error">{error}</span>}
      <SignUpForm onSubmit={handleSubmit} loading={loading} />
      <div className="divider">Or</div>
      <SocialLogin loading={loading} buttonText="Sign up" />
      <p className="login-link">
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
