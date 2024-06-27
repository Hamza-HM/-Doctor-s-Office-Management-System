import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormConfirmResetPassword } from "@src/types/auth/auth";
import { confirmPasswordResetSchema } from "@src/utils/auth/validations/confirmPasswordResetValidation";
import OTPInput from "./fields/FormOTPInput";

interface ConfirmPasswordResetFormProps {
  onSubmit: (data: FormConfirmResetPassword) => void;
  loading: boolean;
}

const ConfirmPasswordResetForm: React.FC<ConfirmPasswordResetFormProps> = ({
  onSubmit,
  loading,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormConfirmResetPassword>({
    resolver: yupResolver(confirmPasswordResetSchema),
    defaultValues: {
      oobCode: "",
    },
  });

  const handleOTPChange = (otp: string) => {
    setValue("oobCode", otp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="oobCode">One-Time Password</label>
        <OTPInput onChange={handleOTPChange} />
        {errors.oobCode && (
          <span className="error">{errors.oobCode.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Confirm Reset
      </button>
    </form>
  );
};

export default ConfirmPasswordResetForm;
