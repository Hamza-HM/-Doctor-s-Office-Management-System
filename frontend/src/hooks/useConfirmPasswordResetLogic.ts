import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { verifyOTP } from "@src/store/actions/authActions";
import { FormConfirmResetPassword } from "@src/types/auth/auth";

const useConfirmPasswordResetLogic = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (data: FormConfirmResetPassword) => {
    console.log(data);
    if (data.oobCode) dispatch(verifyOTP(data));
  };

  const handleResendOTP = () => {
    // Implement resend OTP logic here
  };

  return { handleSubmit, handleResendOTP };
};

export default useConfirmPasswordResetLogic;
