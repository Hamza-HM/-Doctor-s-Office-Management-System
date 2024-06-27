import * as Yup from "yup";

export const confirmPasswordResetSchema = Yup.object().shape({
  oobCode: Yup.string()
    .matches(/^\d{6}$/, "Must be exactly 6 digits")
    .required("One-time password is required"),
});
