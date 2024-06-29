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
  FacebookAuthProvider,
  // updateProfile,
  // updateEmail,
  // updatePassword,
  // sendEmailVerification,
} from "firebase/auth";

import { auth } from "@src/firebase/firebaseConfig";
import { User } from "@src/types/auth/auth";
import { createUserProfile, getUserProfile } from "./userActions";
import { UserData } from "@src/types/auth/user";

const mockUser = {
  location: "Alger, Algeria",
  avatar: "/images/profile-avatar-img.png",
  description:
    "I'm a passionate software developer with 5 years of experience in web technologies. I love building user-friendly interfaces and solving complex problems. When I'm not coding, you can find me hiking or reading sci-fi novels.",
  coverPhoto: "/images/profile-hero-img.png",
};

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
>(
  "auth/signup",
  async ({ data }: SignupCredentials, { rejectWithValue, dispatch }) => {
    try {
      const { fullName, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData: UserData = {
        uid: user.uid,
        email: user.email ?? "",
        fullName,
        location: mockUser.location,
        description: mockUser.description,
        avatar: mockUser.avatar,
      };

      await dispatch(createUserProfile(userData));
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
  }
);

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
    let errorMessage = "Invalid or expired code";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
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

export const facebookSignIn = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("auth/facebookSignin", async (_, { rejectWithValue }) => {
  try {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    return rejectWithValue("An unknown error occurred");
  }
});

export const resetPassword = createAsyncThunk<
  string,
  ResetPasswordCredentials,
  {
    rejectValue: string;
  }
>(
  "auth/resetPassword",
  async ({ email }: ResetPasswordCredentials, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      const res =
        "Success! check your email for instructions to reset your password";
      return res;
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

export const listenToAuthChanges = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/listenToAuthChanges", async (_, { rejectWithValue, dispatch }) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          dispatch(getUserProfile(user.uid));
          resolve(user);
        } else {
          resolve(null);
        }
        unsubscribe(); // Unsubscribe after first auth state change
      },
      (error) => {
        reject(rejectWithValue(error.message || "An error has occurred"));
      }
    );
  });
});
