import type { AppDispatch } from "store";
import { userLoadedFail, userLoadedSuccess } from "@reduxStore/auth/authSlice";
import { apiGetCurrentUser } from "@/api/user";
import { setThemePair, type ThemePair } from "@reduxStore/theme/themeSlice";

/**
 * Load the current user profile – tenant-specific endpoint.
 * URL: {schema_name}.{domain}/users/me/
 */
export const load_user = () => async (dispatch: AppDispatch) => {
  if (!localStorage.getItem("access")) {
    dispatch(userLoadedFail());
    return;
  }

  try {
    const response = await apiGetCurrentUser();
    const themeFromBackend = response.data.theme;
    const validThemes: ThemePair[] = ['corporate', 'purple', 'green', 'blue'];

    const themeData: ThemePair = themeFromBackend && validThemes.includes(themeFromBackend as ThemePair)
      ? (themeFromBackend as ThemePair)
      : 'corporate';

    dispatch(setThemePair(themeData));
    dispatch(userLoadedSuccess(response.data));
  } catch {
    dispatch(userLoadedFail());
  }
};
