import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Moon, 
  Sun, 
  User, 
  Bell, 
  Search, 
  LogOut, 
  Settings,
  ChevronDown,
  Menu
} from "lucide-react";
import type { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setMode } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";
import { logout } from "@reduxStore/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Basic ERP</h1>
          </Link>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <div
              className={`flex items-center transition-all duration-300 ${
                isSearchOpen ? "w-64" : "w-10"
              }`}
            >
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="ml-2 w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleThemeMode}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mode === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 py-2">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="font-semibold text-sm">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-1" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
