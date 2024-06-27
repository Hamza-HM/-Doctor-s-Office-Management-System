import * as Yup from "yup";

export interface FormLoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const loginSchema = Yup.object().shape({
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
