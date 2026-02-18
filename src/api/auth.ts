/**
 * Auth API Service
 *
 * All authentication-related API calls.
 * Tenant-specific endpoints use getTenantApiUrl().
 * Public endpoints use getPublicApiUrl().
 */
import apiClient from './client';
import { getTenantApiUrl, getPublicApiUrl } from '@utils/apiConfig';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface SignupPayload {
  email: string;
  nickname: string;
  password: string;
  re_password: string;
  name: string;
  first_lastname: string;
  company_name: string;
  schema_name: string;
}

// ---------------------------------------------------------------------------
// Tenant-specific endpoints
// ---------------------------------------------------------------------------

/** POST /users/auth/login/ – Tenant-specific */
export function apiLogin(email: string, password: string) {
  return apiClient.post<LoginResponse>(
    getTenantApiUrl('/users/auth/login/'),
    { email, password },
  );
}

/** POST /users/auth/logout/ – Tenant-specific */
export function apiLogout() {
  return apiClient.post(getTenantApiUrl('/users/auth/logout/'));
}

/** POST /users/auth/refresh/ – Tenant-specific */
export function apiRefreshToken(refresh: string) {
  return apiClient.post<{ access: string }>(
    getTenantApiUrl('/users/auth/refresh/'),
    { refresh },
  );
}

/** POST /users/auth/set-password/ – Tenant-specific (invited users / password reset) */
export function apiSetPassword(token: string, password: string, password_confirm: string) {
  return apiClient.post(
    getTenantApiUrl('/users/auth/set-password/'),
    { token, password, password_confirm },
  );
}

// ---------------------------------------------------------------------------
// Public schema endpoints
// ---------------------------------------------------------------------------

/** POST /users/auth/signup/ – Public schema */
export function apiSignup(data: SignupPayload) {
  return apiClient.post(getPublicApiUrl('/users/auth/signup/'), data);
}

/** POST /users/auth/activate/ – Public schema */
export function apiActivateAccount(token: string) {
  return apiClient.post(getPublicApiUrl('/users/auth/activate/'), { token });
}

/** POST /users/auth/verify/ – Public schema */
export function apiVerifyToken(token: string) {
  return apiClient.post(getPublicApiUrl('/users/auth/verify/'), { token });
}
