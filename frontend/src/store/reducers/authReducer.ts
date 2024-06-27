import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthStatus,
  googleSignIn,
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
        // state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        localStorage.setItem("accessToken", "");
        state.loading = false;
        state.error = action.payload as string;
        // state.isAuthenticated = false;
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
        // state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        localStorage.setItem("accessToken", "");
        // state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.setItem("accessToken", "");
        state.user = null;
        // state.isAuthenticated = false;
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
        // state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        localStorage.setItem("accessToken", "");
        state.loading = false;
        // state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.email = action.payload.email;
        state.loading = false;
        state.error = "";
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = (action.payload as string) ?? "An error occurred";
      });
  },
});

export default authSlice.reducer;
