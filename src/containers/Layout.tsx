import { Outlet } from "react-router-dom";
import ThemeManager from "../components/ThemeManager";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="duration-300 ease-out min-h-screen bg-lighter-gray dark:bg-gray-950">
      <ThemeManager />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
