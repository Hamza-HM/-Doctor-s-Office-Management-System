import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .matches(
      /^[A-Za-z ]{5,}$/,
      "Full Name must contain at least 5 letters and spaces"
    ),
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
  termsBool: Yup.boolean(),
});
