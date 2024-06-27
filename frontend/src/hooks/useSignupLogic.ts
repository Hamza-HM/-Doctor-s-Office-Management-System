import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store";
import { checkAuthStatus, signup } from "@src/store/actions/authActions";
import { FormSignupValues } from "@src/types/auth/auth";

const useSignUpLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data: FormSignupValues) => {
    if (data) {
      try {
        await dispatch(signup({ data })).unwrap();
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };

  return { handleSubmit };
};

export default useSignUpLogic;
