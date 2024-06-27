import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { verifyOTP } from "@src/store/actions/authActions";

interface FormConfirmResetPassword {
  oobCode: string;
}

const initialValues: FormConfirmResetPassword = {
  oobCode: "",
};

const schema = Yup.object().shape({
  oobCode: Yup.string()
    .matches(/^\d{6}$/, "Must be exactly 6 digits")
    .required("One-time password is required"),
});

const ConfirmPasswordReset: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("oobCode", newOtp.join(""));
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {};

  const onSubmit = (data: FormConfirmResetPassword) => {
    console.log(data);
    if (data.oobCode) dispatch(verifyOTP(data));
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-form-inner">
          <div className="auth-form-header">
            <div className="row gap-20">
              <h1>Confirm Password Reset</h1>
              <img src="/images/lock-emoji.png" alt="lock emoji" />
            </div>
            <p>Enter the 6-digit code sent to your email</p>
          </div>
          {error && <span className="error">{error}</span>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="oobCode">One-Time Password</label>
              <div className="otp-input-wrapper">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      handleChange(index, e.target.value);
                    }}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                  />
                ))}
              </div>
              {errors.oobCode && (
                <span className="error">{errors.oobCode.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || otp.join("").length !== 6}
            >
              Confirm Reset
            </button>
          </form>
          <p className="login-link">
            *didn’t receive verificatin code ?{" "}
            <p onClick={handleResendOTP}>Resend</p>
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

export default ConfirmPasswordReset;
