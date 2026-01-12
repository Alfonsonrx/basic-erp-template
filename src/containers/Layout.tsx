"use client";

import { Outlet } from "react-router-dom";
import ThemeManager from "../components/ThemeManager";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/types";

function Layout() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  // Apply data-theme attribute for Tailwind dark mode
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="duration-300 ease-out h-screen bg-lighter-gray dark:bg-gray-950">
      <ThemeManager />

      <div className="flex-1 flex flex-col h-full">
        {/* Navbar full width, above sidebar */}
        <Navbar />
        <main className="flex bg-background text-foreground overflow-auto h-full">
          <Sidebar />
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;