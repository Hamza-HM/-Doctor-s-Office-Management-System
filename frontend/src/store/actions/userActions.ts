import { ref, set, get, update, remove } from "firebase/database";
import { db, auth } from "@src/firebase/firebaseConfig";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "@src/types/auth/user";

export const createUserProfile = createAsyncThunk<
  void,
  UserData,
  { rejectValue: string }
>("auth/createUserSpace", async (userData, { rejectWithValue }) => {
  try {
    const userRef = ref(db, `users/${userData.uid}`);
    await set(userRef, userData);
  } catch (error) {
    return rejectWithValue("Failed to create user space");
  }
});

export const getUserProfile = createAsyncThunk<
  UserData,
  string,
  { rejectValue: string }
>("user/getUserData", async (uid, { rejectWithValue }) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val() as UserData;
      return {
        uid: userData.uid,
        email: userData.email,
        fullName: userData.fullName,
        location: userData.location,
        description: userData.description,
        avatar: userData.avatar,
      };
    } else {
      console.log("No data available for this user");
      return rejectWithValue("User data not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return rejectWithValue("Failed to get user data");
  }
});

export const updateUserProfile = createAsyncThunk<
  void,
  Partial<UserData>,
  { rejectValue: string }
>("user/updateUserData", async (userData, { rejectWithValue, dispatch }) => {
  try {
    const userRef = ref(db, `users/${userData.uid}`);
    await update(userRef, userData);
    dispatch(getUserProfile(userData.uid || ""));
  } catch (error) {
    return rejectWithValue("Failed to update user data");
  }
});

export const deleteUserProfile = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/deleteUserData", async (uid, { rejectWithValue }) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    await remove(userRef);
  } catch (error) {
    return rejectWithValue("Failed to delete user data");
  }
});

export const listenToAuthChanges = createAsyncThunk<void, void>(
  "user/listenToAuthChanges",
  async (_, { dispatch }) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserProfile(user.uid));
      } else {
        dispatch({ type: "auth/userSignedOut" });
      }
    });
  }
);
