/**
 * Axios API Client
 *
 * Provides a pre-configured axios instance with:
 * - Automatic JWT token injection
 * - Automatic token refresh on 401 responses
 * - Redirect to /unauthorized when refresh fails
 */
import axios from 'axios';
import { getTenantApiUrl } from '@utils/apiConfig';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ---------------------------------------------------------------------------
// Request interceptor – attach JWT access token
// ---------------------------------------------------------------------------
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor – handle 401 & token refresh
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        try {
          const response = await axios.post(
            getTenantApiUrl('/users/auth/refresh/'),
            { refresh },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const { access } = response.data;
          localStorage.setItem('access', access);

          // Retry original request with new token
          originalRequest.headers.Authorization = `JWT ${access}`;
          return apiClient(originalRequest);
        } catch {
          // Refresh failed – clear tokens and navigate to unauthorized page
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/unauthorized';
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
