import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store";
import { login } from "@src/store/actions/authActions";
import { FormLoginValues } from "@src/utils/auth/validations/loginValidation";

const useLoginLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (data: FormLoginValues) => {
    if (data) {
      await dispatch(login({ data }));
    }
  };

  return { handleSubmit };
};

export default useLoginLogic;
