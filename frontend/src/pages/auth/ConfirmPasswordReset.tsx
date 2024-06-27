import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import "./auth.css";
import AuthHeader from "@src/components/sections/auth/AuthHeader";
import AuthLayout from "@src/components/sections/auth/AuthLayout";
import ConfirmPasswordResetForm from "@src/forms/ConfirmPasswordResetForm";
import useConfirmPasswordResetLogic from "@src/hooks/useConfirmPasswordResetLogic";

const ConfirmPasswordReset: React.FC = () => {
  const { loading, error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const { handleSubmit, handleResendOTP } = useConfirmPasswordResetLogic();

  return (
    <AuthLayout>
      <AuthHeader
        title="Confirm Password Reset"
        subtitle="Enter the 6-digit code sent to your email"
        imageSrc="/images/lock-emoji.png"
        imageAlt="lock emoji"
      />
      {error && <span className="error">{error}</span>}
      <ConfirmPasswordResetForm onSubmit={handleSubmit} loading={loading} />
      <p className="login-link">
        *didn't receive verification code?{" "}
        <p onClick={handleResendOTP}>Resend</p>
      </p>
    </AuthLayout>
  );
};

export default ConfirmPasswordReset;
