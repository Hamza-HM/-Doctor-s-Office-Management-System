import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./auth.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { checkAuthStatus, login } from "@src/store/actions/authActions";
import { useNavigate } from "react-router-dom";

interface FormLoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const initialValues: FormLoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*\d)(?=.*\W)(?=.*[A-Z]).{8,}$/,
      "Password must contain at least one digit, one special character, and one uppercase letter"
    ),
  rememberMe: Yup.boolean(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); //
  const { loading, error, isAuthenticated } = useSelector<
    RootState,
    RootState["auth"]
  >((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: FormLoginValues) => {
    if (data) {
      try {
        await dispatch(login({ data })).unwrap();
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-form-inner">
          <div className="auth-form-header">
            <div className="row gap-20">
              <h1>Welcome To Healthy 24</h1>
              <img src="/images/all-good-emoju.png" alt="waving hand emoji" />
            </div>
            <p>Enter your account to use healthy 24 service</p>
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
                <div className="terms-wrapper ">
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
                <p className="forgot-password">Forgot password</p>
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

          <div className="divider">or</div>
          <button className="btn btn-google custom-border" disabled={loading}>
            <div className="row gap-10">
              <img src="/images/google.png" alt="facebook icon" />
              <p>Sign in with Google</p>
            </div>
          </button>
          <button className="btn btn-facebook custom-border" disabled={loading}>
            <div className="row gap-10">
              <img src="/images/facebook.png" alt="facebook icon" />
              <p>Sign in with Facebook</p>
            </div>
          </button>

          <p className="login-link">
            You don’thave account ? <a href="/auth/signup">Sign up</a>
          </p>
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

export default Login;
