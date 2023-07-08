import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@utils/api";
import { TUser, TUserLogin, TUserRegister } from "@config/types";
import { deleteCookie, setCookie } from "@utils/cookie";
import {
  ACCESS_COOKIE_OPTIONS,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "@config/constants";

export const userLogin = createAsyncThunk("user/login", (data: TUserLogin) => {
  return Api.userLogin(data);
});

export const userRegister = createAsyncThunk(
  "user/register",
  (data: TUserRegister) => {
    return Api.userRegister(data);
  }
);

export const userLogout = createAsyncThunk("user/logout", () => {
  return Api.userLogout(localStorage.getItem(REFRESH_TOKEN_NAME) as string);
});

export const userAuthorize = createAsyncThunk("user/authorize", () => {
  const token = localStorage.getItem(REFRESH_TOKEN_NAME);
  if (!token) {
    return Promise.reject();
  } else {
    return Api.userAuthorize();
  }
});

export const userUpdate = createAsyncThunk(
  "user/update",
  (data: TUserRegister) => {
    return Api.userUpdateProfile(data);
  }
);

const initialState: TUser = {
  success: false,
  user: {
    name: "",
    email: "",
  },
  userLoading: false,
  error: "",
  authorized: false,
  authProcess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      return { ...state, error: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userLogin.pending, () => {
        return {
          ...initialState,
          userLoading: true,
          success: false,
          error: "",
        };
      })
      .addCase(userLogin.rejected, (state, action) => {
        return {
          ...initialState,
          userLoading: false,
          success: false,
          error: action.error.message,
        };
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem(
          REFRESH_TOKEN_NAME,
          action.payload.refreshToken as string
        );
        setCookie(
          ACCESS_TOKEN_NAME,
          action.payload.accessToken as string,
          ACCESS_COOKIE_OPTIONS
        );
        return {
          ...(action.payload as TUser),
          userLoading: false,
          error: "",
          authorized: true,
        };
      })
      // Authorize
      .addCase(userAuthorize.pending, () => {
        return { ...initialState, authProcess: true };
      })
      .addCase(userAuthorize.fulfilled, (state, action) => {
        return {
          ...initialState,
          ...(action.payload as TUser),
          authorized: true,
          authProcess: false,
        };
      })
      .addCase(userAuthorize.rejected, () => {
        return { ...initialState, authProcess: false };
      })
      // Register
      .addCase(userRegister.pending, () => {
        return {
          ...initialState,
          userLoading: true,
          success: false,
          error: "",
        };
      })
      .addCase(userRegister.rejected, (state, action) => {
        return {
          ...initialState,
          userLoading: false,
          success: false,
          error: action.error.message,
        };
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        return {
          ...(action.payload as TUser),
          userLoading: false,
          error: "",
          authorized: true,
        };
      })
      // Update profile
      .addCase(userUpdate.pending, () => {
        return {
          ...initialState,
          userLoading: true,
          authorized: true,
          error: "",
        };
      })
      .addCase(userUpdate.rejected, (state, action) => {
        return {
          ...initialState,
          userLoading: false,
          authorized: true,
          error: action.error.message,
        };
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        return {
          ...initialState,
          ...(action.payload as TUser),
          userLoading: false,
          authorized: true,
          error: "",
        };
      })
      // Logout
      .addCase(userLogout.rejected, () => {
        deleteCookie(ACCESS_TOKEN_NAME);
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        return { ...initialState, userLoading: false };
      })
      .addCase(userLogout.fulfilled, () => {
        deleteCookie(ACCESS_TOKEN_NAME);
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        return { ...initialState, userLoading: false };
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
