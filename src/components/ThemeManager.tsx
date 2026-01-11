import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../reduxStore/theme/themeSlice";
import type { RootState } from "../types";

function ThemeManager() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme); // Updated path

  // Apply 'dark' class and save to localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        dispatch(setTheme(e.matches ? "dark" : "light"));
      }
    };

    if (!localStorage.getItem("theme")) {
      handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);
    }
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);
  return null;
}

export default ThemeManager;
