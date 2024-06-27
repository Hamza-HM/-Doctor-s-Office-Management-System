import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { resetPassword } from "@src/store/actions/authActions";
import { FormResetPassword } from "@src/types/auth/auth";

const useResetPasswordLogic = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitPasswordReset = async (data: FormResetPassword) => {
    if (data) {
      try {
        await dispatch(resetPassword(data));
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  return { handleSubmitPasswordReset };
};

export default useResetPasswordLogic;
