import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormResetPassword } from "@src/types/auth/auth";
import { resetPasswordSchema } from "@src/utils/auth/validations/RessetPAsswordValidation";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import useResetPasswordLogic from "@src/hooks/useResetPasswordLogic";

const ResetPasswordForm: React.FC = () => {
  const { loading } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  const { handleSubmitPasswordReset } = useResetPasswordLogic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormResetPassword>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(handleSubmitPasswordReset)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter Your email here"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
