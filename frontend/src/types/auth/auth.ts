import { User as FirebaseUser } from "firebase/auth";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface User extends FirebaseUser {
  stsTokenManager?: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
}

// export interface User {
//   displayName?: string;
//   email: string;
//   emailVerified: boolean;
//   isAnonymous?: boolean;
//   metadata?: {
//     createdAt: string;
//     lastLoginAt: string;
//     lastSignInTime: string;
//     creationTime: string;
//   };
//   phoneNumber?: string;
//   photoURL?: string;
//   providerData?: string[]; // Simplified for brevity
//   providerId?: string;
//   reloadUserInfo?: {
//     localId: string;
//     email: string;
//     passwordHash: string;
//     emailVerified: boolean;
//     passwordUpdatedAt: number;
//     // Add other fields as needed
//   };
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//   };
//   uid: string;
// }

export interface AuthStateProps {
  user: User | null;
  email?: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  error: string;
  success: string;
}

export interface FormSignupValues {
  fullName: string;
  email: string;
  password: string;
  termsBool?: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface FormResetPassword {
  email: string;
}

export interface FormConfirmResetPassword {
  oobCode: string;
}

// export interface InputFieldProps {
//   type: string;
//   id: keyof TFormValues;
//   label: string;
//   register: UseFormRegister<TFormValues>;
//   error?: FieldError;
//   placeholder?: string;
// }

export type TFormValues = FormSignupValues &
  LoginFormValues &
  FormResetPassword &
  FormConfirmResetPassword;

export type InputFieldProps = {
  type: string;
  id: keyof TFormValues;
  label: string;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: FieldError;
  placeholder?: string;
};
