import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSignupValues } from "@src/types/auth/auth";
import { signUpSchema } from "@src/utils/auth/validations/signupValidation";

interface SignUpFormProps {
  onSubmit: (data: FormSignupValues) => void;
  loading: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupValues>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      termsBool: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            placeholder="Enter Your full name here"
          />
          {errors.fullName && (
            <span className="error">{errors.fullName.message}</span>
          )}
        </div>
      </div>

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
        <div className="terms-wrapper">
          <input
            id="checkbox"
            className="custom-checkbox"
            type="checkbox"
            {...register("termsBool")}
          />
          <label htmlFor="checkbox" className="terms-conditions">
            by sign up to healthy 24 you agree all <span>term</span> and
            <span> condition</span>
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
