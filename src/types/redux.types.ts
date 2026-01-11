import type { AuthState } from "../reduxStore/auth/authSlice";
import type { ThemeState } from "../reduxStore/theme/themeSlice";

export interface RootState {
  auth: AuthState; // Replace with actual auth state type if known
  theme: ThemeState;
}
