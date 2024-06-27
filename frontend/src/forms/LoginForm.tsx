import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@src/utils/auth/validations/loginValidation";
import { LoginFormValues } from "@src/types/auth/auth";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter Your password here"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
      </div>

      <div className="form-options">
        <div className="remember-me">
          <div className="terms-wrapper">
            <input
              id="checkbox"
              className="custom-checkbox"
              type="checkbox"
              {...register("rememberMe")}
            />
            <label htmlFor="checkbox" className="terms-conditions">
              Remember me
            </label>
          </div>
          <Link className="forgot-password" to="/auth/reset-password">
            Forgot password
          </Link>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
