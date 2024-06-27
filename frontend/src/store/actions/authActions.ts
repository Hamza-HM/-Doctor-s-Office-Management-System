import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  // updateProfile,
  // updateEmail,
  // updatePassword,
  // sendEmailVerification,
} from "firebase/auth";

import { auth, db } from "@src/firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";
import { User } from "@src/types/auth/auth";

import { jwtDecode } from "@src/utils/auth/jwtDecode";

interface SignupCredentials {
  data: {
    fullName: string;
    email: string;
    password: string;
  };
}

interface LoginCredentials {
  data: {
    email: string;
    password: string;
  };
}

interface ResetPasswordCredentials {
  email: string;
}

interface VerifyOTPCredentials {
  oobCode: string;
}
interface UpdatePasswordCredentials {
  oobCode: string;
  newPassword: string;
}

export const signup = createAsyncThunk<
  User,
  SignupCredentials,
  {
    rejectValue: string;
  }
>("auth/signup", async ({ data }: SignupCredentials, { rejectWithValue }) => {
  try {
    const { fullName, email, password } = data;
    console.log(fullName, email, password);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = push(ref(db, "users")).key;

    const res = await set(ref(db, `users/${userId}`), {
      uid: user.uid,
      email: user.email,
      fullName,
    });
    console.log(res);
    console.log("success", user);
    return user;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unknown error occurred";
    }
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk<
  User,
  LoginCredentials,
  {
    rejectValue: string;
  }
>("auth/login", async ({ data }: LoginCredentials, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return rejectWithValue("An unknown error occurred");
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    return rejectWithValue("An unknown error occurred");
  }
});

export const googleSignIn = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("auth/googleSignIn", async (_, { rejectWithValue }) => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    return rejectWithValue("An unknown error occurred");
  }
});

export const resetPassword = createAsyncThunk<
  void,
  ResetPasswordCredentials,
  {
    rejectValue: string;
  }
>(
  "auth/resetPassword",
  async ({ email }: ResetPasswordCredentials, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const verifyOTP = createAsyncThunk<
  string,
  VerifyOTPCredentials,
  {
    rejectValue: string;
  }
>(
  "auth/verifyOTP",
  async ({ oobCode }: VerifyOTPCredentials, { rejectWithValue }) => {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode);
      return email;
    } catch (error) {
      let errorMessage = "Invalid or expired code";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePassword = createAsyncThunk<
  void,
  UpdatePasswordCredentials,
  {
    rejectValue: string;
  }
>(
  "auth/updatePassword",
  async (
    { oobCode, newPassword }: UpdatePasswordCredentials,
    { rejectWithValue }
  ) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
      let errorMessage = "Failed to update password";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthStatus = createAsyncThunk<
  { isAuthenticated: boolean; email: string | null },
  void,
  { rejectValue: string }
>("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      const email = tokenData.email;
      return { isAuthenticated: true, email };
    } else {
      // If there's no access token, we still want to indicate that the user is not authenticated
      return { isAuthenticated: false, email: null };
    }
  } catch (error) {
    // Properly handle errors, such as failing to read from local storage
    console.error(error);
    return rejectWithValue("Failed to retrieve authentication status.");
  }
});
