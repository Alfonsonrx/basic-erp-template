import { Outlet } from "react-router-dom";
import ThemeManager from "../components/ThemeManager";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

function Layout() {
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
