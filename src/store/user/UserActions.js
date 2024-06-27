import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOAD_USER_FULFILLED,
  LOAD_USER_REJECTED,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
} from "./UserTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkIsAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const isNanny = JSON.parse(localStorage.getItem("isNanny") || false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (response && response.data.code !== "token_not_valid") {
        dispatch({
          type: AUTH_SUCCESS,
        });
        dispatch(loadUser({ isNanny }));
      } else {
        dispatch({
          type: AUTH_FAIL,
        });
      }
    } catch (_) {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const loginUser =
  ({ username, password, isNanny }) =>
  async (dispatch) => {
    dispatch({
      type: LOGIN_USER_PENDING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
      );

      dispatch({
        type: LOGIN_USER_FULFILLED,
        payload: response.data,
      });

      //   on success, load user
      dispatch(loadUser({ isNanny }));
    } catch (error) {
      dispatch({
        type: LOGIN_USER_REJECTED,
        error: error?.message || "Error! Try Again!",
      });
    }
  };

export const loadUser =
  ({ isNanny }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      const userData = response.data;

      if (!userData["is_staff"]) {
        if (isNanny) {
          if (userData["user_type"] !== "nanny") {
            throw new Error("Invalid Credentials");
          } else {
            localStorage.setItem("isNanny", true);
          }
        } else {
          if (userData["user_type"] !== "family") {
            throw new Error("Invalid Credentials");
          } else {
            localStorage.setItem("isNanny", false);
          }
        }
      }

      dispatch({
        type: LOAD_USER_FULFILLED,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_REJECTED,
        error: error?.message,
      });
    }
  };

export const sign_up = createAsyncThunk(
  "user/signup",
  async ({
    first_name,
    last_name,
    username,
    phone_number,
    email,
    password,
    re_password,
    location,
    user_type,
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
      re_password,
      phone_number,
      location,
      user_type,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );

    const res = await response.data;

    return res;
  }
);

export const create_address = createAsyncThunk(
  "user/create_address",
  async ({ address, town, county }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      address,
      town,
      county,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/address/`,
      body,
      config
    );

    const res = await response.data;

    return res;
  }
);

export const create_nanny = createAsyncThunk(
  "user/create_address",
  async ({ user, availability, hourly_rate }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      user,
      availability,
      hourly_rate,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/nanny/`,
      body,
      config
    );

    const res = await response.data;

    return res;
  }
);
