import { createSlice } from "@reduxjs/toolkit";
import {
  facebookSignIn,
  googleSignIn,
  listenToAuthChanges,
  login,
  logout,
  resetPassword,
  signup,
} from "@src/store/actions/authActions";

import { AuthStateProps } from "@src/types/auth/auth";

const initialState: AuthStateProps = {
  user: null,
  loading: false,
  email: null,
  isAuthenticated: null,
  success: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem(
          "accessToken",
          action.payload.stsTokenManager?.accessToken || ""
        );
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(
          "accessToken",
          action.payload.stsTokenManager?.accessToken || ""
        );
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        localStorage.setItem(
          "accessToken",
          action.payload.stsTokenManager?.accessToken || ""
        );
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(facebookSignIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(facebookSignIn.fulfilled, (state, action) => {
        localStorage.setItem(
          "accessToken",
          action.payload.stsTokenManager?.accessToken || ""
        );
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(facebookSignIn.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.success = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(listenToAuthChanges.pending, (state) => {
        state.loading = true; // Set loading to true while fetching user
      })
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.email = action.payload?.email;
        state.loading = false;
        state.error = "";
      })
      .addCase(listenToAuthChanges.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = (action.payload as string) ?? "An error occurred";
      });
  },
});

export default authSlice.reducer;
