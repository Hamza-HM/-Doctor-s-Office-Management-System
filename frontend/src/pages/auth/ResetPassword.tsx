import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./auth.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetPassword } from "@src/store/actions/authActions";
import { AppDispatch, RootState } from "@src/store";

interface FormResetPassword {
  email: string;
}

const initialValues: FormResetPassword = {
  email: "",
};

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Invalid email format"
    )
    .required("Email is required"),
});

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); //
  const { loading, error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: FormResetPassword) => {
    if (data) {
      dispatch(resetPassword(data));
    }
    // Handle signup logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-form-inner">
          <div className="auth-form-header">
            <div className="row gap-20">
              <h1>Forget Password</h1>
              <img src="/images/lock-emoji.png" alt="waving hand emoji" />
            </div>
            <p>Enter your email to recover password</p>
          </div>
          {error && <span className="error">{error}</span>}
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="signup-info-container">
        <img
          src="/images/auth-side-img.png"
          alt="Feature"
          className="feature-image"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
