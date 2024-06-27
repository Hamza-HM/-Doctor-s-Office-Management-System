import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store";
import { facebookSignIn, googleSignIn } from "@src/store/actions/authActions";

const useSocialAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleGoogleSignin = async () => {
    try {
      await dispatch(googleSignIn());
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  const handleFacebookSignin = async () => {
    try {
      await dispatch(facebookSignIn());
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  return { handleGoogleSignin, handleFacebookSignin };
};

export default useSocialAuth;
