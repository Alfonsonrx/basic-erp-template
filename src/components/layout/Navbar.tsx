import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import type { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setThemePair, toggleTheme } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";
import { IconButton } from "@components/Buttons/IconButton";
import { logout } from "@reduxStore/auth/authSlice";

// Navbar component – includes theme toggle, profile menu & user dropdown
export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-primary-foreground text-foreground w-screen flex items-center justify-between px-6 py-4 shadow-md border-b-2 border-primary">
      <h1 className="text-xl font-semibold">Basic ERP</h1>
      <div className="flex space-x-4 relative">
        {/* Theme toggle */}
        <IconButton
          icon={mode === "light" ? Moon : Sun}
          onClick={() => dispatch(toggleTheme())}
          className="p-2"
        />
        {/* Theme pair selector */}
        <select
          name="pair-select"
          id="pair-sel"
          className="bg-transparent text-foreground"
        >
          <option
            value="corporate"
            onClick={() => dispatch(setThemePair("corporate"))}
          >
            Corporate
          </option>
          <option
            value="purple"
            onClick={() => dispatch(setThemePair("purple"))}
          >
            Purple
          </option>
          <option value="green" onClick={() => dispatch(setThemePair("green"))}>
            Green
          </option>
          <option value="blue" onClick={() => dispatch(setThemePair("blue"))}>
            Blue
          </option>
        </select>

        {/* Profile button & dropdown */}
        <button
          className="flex items-center gap-2 cursor-pointer hover:bg-card transition-colors px-2 rounded-sm"
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
        >
          <User className="w-4 h-4" />
          Profile
        </button>

        {/* Dropdown menu */}
        <div
          className={`${
            isUserMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          } transition-all duration-200`}
          onMouseLeave={() => setIsUserMenuOpen(false)}
        >
          {/* <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} /> */}
          <div className="absolute flex flex-col right-0 top-full mt-4 w-48 bg-card border border-border rounded-md shadow-lg z-20">
            <Link
              to="/profile"
              className="w-full px-4 py-2 text-left hover:bg-border transition-colors"
            >
              My Profile
            </Link>
            <span
              className="cursor-pointer w-full px-4 py-2 text-left hover:bg-border transition-colors text-destructive"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
