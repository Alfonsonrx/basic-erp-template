// ThemeManager.tsx  (now more like ThemeApplier)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../reduxStore/theme/themeSlice";
import type { RootState } from "../types";

function ThemeApplier() {
  const dispatch = useDispatch();
  const { pair, mode } = useSelector((state: RootState) => state.theme);
  

  useEffect(() => {
    const html = document.documentElement;

    // 1. Clean all possible theme classes
    html.classList.remove("dark");
    html.classList.remove(
      "theme-corporate",
      "theme-purple"
    );

    // 2. Apply correct classes
    html.classList.add(`theme-${pair}`);
    

    // if (currentTheme.includes("dark") || currentTheme === "dark") {
    if (mode === 'dark') {
      html.classList.add('dark');
    }
  }, [pair, mode]);

  // System preference listener (only when no saved preference)
  // useEffect(() => {
  //   const media = window.matchMedia("(prefers-color-scheme: dark)");

  //   const handleChange = (e: MediaQueryListEvent) => {
  //     if (!localStorage.getItem("theme")) {
  //       dispatch(setMode(e.matches ? "dark" : "light"));
  //     }
  //   };

  //   if (!localStorage.getItem("theme")) {
  //     handleChange({ matches: media.matches } as any);
  //   }

  //   media.addEventListener("change", handleChange);
  //   return () => media.removeEventListener("change", handleChange);
  // }, [dispatch]);

  return null;
}

export default ThemeApplier;
