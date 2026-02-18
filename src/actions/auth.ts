import type { AxiosError } from "axios";
import type { AppDispatch } from "store";
import { load_user } from "./loadUser";
import {
  activationFail,
  activationSuccess,
  loginFail,
  loginSuccess,
  logout,
  signupFail,
  signupSuccess,
} from "@reduxStore/auth/authSlice";
import { apiLogin, apiLogout, apiSignup, apiActivateAccount } from "@/api/auth";
import type { SignupPayload } from "@/api/auth";

/**
 * Login – tenant-specific endpoint.
 * URL: {schema_name}.{domain}/users/auth/login/
 */
export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiLogin(email, password);

      dispatch(loginSuccess(response.data));
      dispatch(load_user());
    } catch (err) {
      const error = err as AxiosError | Error;
      const errorMessage = error.message || "Login failed";
      dispatch(loginFail(errorMessage));
      throw err;
    }
  };

/**
 * Signup – public schema endpoint.
 * URL: {domain}/users/auth/signup/
 *
 * After successful signup the UI should show an activation message
 * instead of redirecting.
 */
export const signup =
  (data: SignupPayload) => async (dispatch: AppDispatch) => {
    try {
      await apiSignup(data);
      dispatch(signupSuccess());
    } catch (err) {
      const error = err as AxiosError | Error;
      const errorMessage = error.message || "Signup failed";
      dispatch(signupFail(errorMessage));
      throw err;
    }
  };

/**
 * Logout – tenant-specific endpoint.
 * URL: {schema_name}.{domain}/users/auth/logout/
 */
export const logoutAccount = () => async (dispatch: AppDispatch) => {
  try {
    await apiLogout();
  } catch {
    // Logout always succeeds client-side
  } finally {
    dispatch(logout());
  }
};

/**
 * Activate account – public schema endpoint.
 * URL: {domain}/users/auth/activate/
 */
export const activateAccount =
  (token: string | null) => async (dispatch: AppDispatch) => {
    if (!token) {
      dispatch(activationFail("No activation token provided"));
      return;
    }

    try {
      await apiActivateAccount(token);
      dispatch(activationSuccess());
    } catch (err) {
      const error = err as AxiosError | Error;
      const errorMessage = error.message || "Activation failed";
      dispatch(activationFail(errorMessage));
      throw err;
    }
  };
