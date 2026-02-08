import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  Menu,
  Shield,
  CreditCard
} from "lucide-react";
import type { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";
import { logout } from "@reduxStore/auth/authSlice";
import { usePermissions } from "@hooks";
import { LanguageSwitcher } from "@components/LanguageSwitcher";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isAdmin, hasPermission } = usePermissions();
  const { lang } = useParams<{ lang: string }>();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Helper to generate language-prefixed paths
  const getPath = (path: string) => `/${lang}${path}`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
        setIsAdminMenuOpen(false);
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

  const showAdminMenu = isAdmin || hasPermission('billing:view') || hasPermission('admin:permissions');

  return (
    <header className="bg-primary-foreground text-foreground border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Logo */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link to={getPath('/dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Basic ERP</h1>
          </Link>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Admin Menu */}
          {showAdminMenu && (
            <div className="relative mr-2">
              <button
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5 text-primary" />
                <span className="hidden sm:block text-sm font-medium">Admin</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    isAdminMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAdminMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 py-2">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    Administration
                  </div>
                  {hasPermission('billing:manage') && (
                    <Link
                      to={getPath('/admin/billing')}
                      onClick={() => setIsAdminMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      Billing & Subscription
                    </Link>
                  )}
                  {hasPermission('admin:permissions') && (
                    <Link
                      to={getPath('/admin/permissions')}
                      onClick={() => setIsAdminMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Permissions
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Language Switcher */}
          {lang && <LanguageSwitcher />}
          
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
              <span className="hidden sm:block text-sm font-medium">
                {user?.name || "Admin"}
              </span>
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
                  <p className="font-semibold text-sm">{user?.name || "Admin User"}</p>
                  {/* <p className="text-xs text-muted-foreground">{user?.email || "admin@example.com"}</p> */}
                  {user?.role && (
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : user.role === "manager"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}>
                      {user.role}
                    </span>
                  )}
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to={getPath('/profile')}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    to={getPath('/settings')}
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
