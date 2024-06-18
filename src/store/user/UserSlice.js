import { createAction, createSlice } from "@reduxjs/toolkit";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOAD_USER_FULFILLED,
  LOAD_USER_REJECTED,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
} from "./UserTypes";
import { create_address, sign_up } from "./UserActions";

const initialState = {
  loading: false,
  isAuthenticated: null,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("isNanny");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // check is authenticated
    builder
      .addCase(createAction(AUTH_SUCCESS), (state) => {
        state.error = null;
      })

      .addCase(createAction(AUTH_FAIL), (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })

      // login user
      .addCase(createAction(LOGIN_USER_PENDING), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAction(LOGIN_USER_FULFILLED), (state, action) => {
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
        state.loading = false;
        state.error = null;
      })
      .addCase(createAction(LOGIN_USER_REJECTED), (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;

        if (action?.error === "Request failed with status code 401") {
          state.error = "Invalid Credentials";
        } else {
          state.error = action?.error;
        }
      })
      // load user
      .addCase(createAction(LOAD_USER_FULFILLED), (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createAction(LOAD_USER_REJECTED), (state, action) => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        state.user = null;
        state.error = action?.error;
      })
      //create address
      .addCase(create_address.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_address.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(create_address.rejected, (state, action) => {
        state.loading = false;
        // ***try to fetch the specific error, like if email already in use, or no lets not say that email in use that will be divulging sensible info
        state.error = "Error! Try Again!";
      })
      // sign up user
      .addCase(sign_up.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sign_up.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sign_up.rejected, (state, action) => {
        state.loading = false;
        // ***try to fetch the specific error, like if email already in use, or no lets not say that email in use that will be divulging sensible info
        state.error = "Error! Try Again!";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
