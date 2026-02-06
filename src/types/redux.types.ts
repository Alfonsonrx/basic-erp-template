import type { AuthState } from "../reduxStore/auth/authSlice";
import type { ThemeState } from "../reduxStore/theme/themeSlice";
import type { PermissionsState } from "../reduxStore/permissions/permissionsSlice";

export interface RootState {
  auth: AuthState;
  theme: ThemeState;
  permissions: PermissionsState;
}
