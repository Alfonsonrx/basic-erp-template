import { Link, useParams } from "react-router-dom";
import { Moon, Sun, ArrowRight, CheckCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@reduxStore/theme/themeSlice";
import type { RootState } from "@types";
import type { AppDispatch } from "@/store";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
import { PrimaryButton, SecondaryButton } from "@components/Buttons";

// Landing Navbar Component
function LandingNavbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { lang } = useParams<{ lang?: string }>();

  const toggleMode = () => {
    dispatch(toggleTheme());
  };

  const getPath = (path: string) => lang ? `/${lang}${path}` : `/en${path}`;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Logo */}
        <Link to={getPath("/")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Basic ERP</h1>
        </Link>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {lang && <LanguageSwitcher />}

          <button
            onClick={toggleMode}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mode === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          <Link to={getPath("/auth")}>
            <PrimaryButton>Sign In</PrimaryButton>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Main Landing Page Component
export default function LandingPage() {
  const { lang } = useParams<{ lang?: string }>();
  
  const getPath = (path: string) => lang ? `/${lang}${path}` : `/en${path}`;

  const features = [
    "Customer Management",
    "Project Tracking",
    "Team Collaboration",
    "Inventory Control",
    "Appointment Scheduling",
    "Billing & Invoicing",
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Manage Your Business
            <span className="text-primary block">All in One Place</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A simple, intuitive ERP solution for small and medium businesses. 
            Streamline your operations and grow faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to={getPath("/auth")}>
              <PrimaryButton className="flex items-center gap-2 text-lg px-8 py-3">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </PrimaryButton>
            </Link>
            <Link to={getPath("/auth")}>
              <SecondaryButton className="text-lg px-8 py-3">
                Learn More
              </SecondaryButton>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Basic ERP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
