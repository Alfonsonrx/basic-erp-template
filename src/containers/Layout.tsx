import { Outlet } from "react-router-dom";
import ThemeManager from "../components/ThemeManager";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

function Layout() {
  return (
    <div className="duration-300 ease-out h-screen bg-lighter-gray bg-background">
      <ThemeManager />

      <div className="flex-1 flex flex-col h-full">
        {/* Navbar full width, above sidebar */}
        <Navbar />
        <main className="flex text-foreground overflow-auto h-full">
          <Sidebar />
          <div className="p-6 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
