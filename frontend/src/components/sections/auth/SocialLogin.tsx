import useSocialAuth from "@src/hooks/useSocialAuth";
import React from "react";

interface SocialLoginProps {
  loading: boolean;
  buttonText: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ loading, buttonText }) => {
  const { handleGoogleSignin, handleFacebookSignin } = useSocialAuth();
  return (
    <>
      <button
        className="btn btn-google custom-border"
        disabled={loading}
        onClick={handleGoogleSignin}
      >
        <div className="row gap-10">
          <img src="/images/google.png" alt="google icon" />
          <p>{buttonText} with Google</p>
        </div>
      </button>
      <button
        className="btn btn-facebook custom-border"
        disabled={loading}
        onClick={handleFacebookSignin}
      >
        <div className="row gap-10">
          <img src="/images/facebook.png" alt="facebook icon" />
          <p>{buttonText} with Facebook</p>
        </div>
      </button>
    </>
  );
};
export default SocialLogin;
