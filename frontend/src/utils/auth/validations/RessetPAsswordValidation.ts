import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Invalid email format"
    )
    .required("Email is required"),
});
