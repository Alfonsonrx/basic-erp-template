/**
 * User API Service
 *
 * User-related API calls (all tenant-specific).
 */
import apiClient from './client';
import { getTenantApiUrl } from '@utils/apiConfig';

export interface UserProfile {
  id: string;
  name: string;
  role?: 'admin' | 'manager' | 'employee';
  theme?: string | null;
}

/** GET /users/me/ – Tenant-specific */
export function apiGetCurrentUser() {
  // return apiClient.get<UserProfile>(getTenantApiUrl('/users/me/'));
  return {
    "data": {
      "id": 1,
      "email": "neroxg36@protonmail.com",
      "name": "Nerox",
      "first_lastname": "doe",
      "is_admin": true,
      "is_manager": true,
      "status": "new",
      "theme": "corporate"
    }
  }
}
