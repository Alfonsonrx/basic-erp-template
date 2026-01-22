import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: { id: string; name: string; role?: `admin`|`manager`|`employee` } | null;
  error: string | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  isAuthenticated: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticatedSuccess(state) {
      state.isAuthenticated = true;
    },
    loginSuccess(state, action: PayloadAction<{ access: string; refresh: string }>) {
      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    signupSuccess(state) {
      state.isAuthenticated = false;
    },
    userLoadedSuccess(state, action: PayloadAction<{ id: string; name: string; role?: `admin`|`manager`|`employee` }>) {
      state.user = action.payload
    },
    authenticatedFail(state) {
      state.isAuthenticated = false;
    },
    userLoadedFail(state) {
      state.user = null
    },
    loginFail(state, action: PayloadAction<string | null>) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload || 'Login Failed'
    },
    signupFail(state, action: PayloadAction<string | null>) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload || 'Signup Failed'
    },
    refreshFail(state) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.user = null
    },
    logout(state) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },

    // Password Reset
    passwordResetSuccess(state) {
      // In case of
    },
    passwordResetFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload || "Password reset failed";
    },
    passwordResetConfirmSuccess(state) {
      // In case of
    },
    passwordResetConfirmFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload || "Password reset confirmation failed";
    },

    // Nickname Reset
    nicknameResetSuccess(state) {
      // In case of
    },
    nicknameResetFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload || "Nickname reset failed";
    },
    nicknameResetConfirmSuccess(state) {
      // In case of
    },
    nicknameResetConfirmFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload || "Nickname reset confirmation failed";
    },

    // Activation
    activationSuccess(state) {
      // In case of
    },
    activationFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload || 'Activation failed';
    },
  },
});

export const {
  authenticatedSuccess,
  loginSuccess,
  signupSuccess,
  userLoadedSuccess,
  authenticatedFail,
  userLoadedFail,
  loginFail,
  signupFail,
  refreshFail,
  logout,
  passwordResetSuccess,
  passwordResetFail,
  passwordResetConfirmSuccess,
  passwordResetConfirmFail,
  nicknameResetSuccess,
  nicknameResetFail,
  nicknameResetConfirmSuccess,
  nicknameResetConfirmFail,
  activationSuccess,
  activationFail,
} = authSlice.actions;
export default authSlice.reducer;