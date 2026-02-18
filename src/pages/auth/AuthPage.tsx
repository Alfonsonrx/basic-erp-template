import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "@components/Buttons";
import { login, signup } from "@actions/auth";
import type { SignupPayload } from "@/api/auth";
import type { RootState } from "@types";
import type { AppDispatch } from "store";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Building2,
  Hash,
  UserCircle,
  CheckCircle,
} from "lucide-react";

export default function AuthPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  const { isOnTenantSubdomain, currentTenant } = useSelector(
    (state: RootState) => state.tenant,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    const navLink = lang ? `/${lang}/dashboard` : "/en/dashboard";
    navigate(navLink);
  }

  const [isLogin, setIsLogin] = useState(true);

  const getPath = (path: string) => (lang ? `/${lang}${path}` : `/en${path}`);

  // ── Shared fields ──────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [sharedFields, setSharedFields] = useState({
    email: "",
    password: "",
  });

  // ── Signup-only fields ─────────────────────────────────────────────
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupFields, setSignupFields] = useState({
    re_password: "",
    nickname: "",
    name: "",
    first_lastname: "",
    company_name: "",
    schema_name: "",
  });

  // ── UI state ───────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────

  const handleSharedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSharedFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignupChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSignupFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ── Login ────────────────────────────────────────────────────────
    if (isLogin) {
      if (!isOnTenantSubdomain) {
        setError(
          "You must access a tenant subdomain to log in (e.g. acme." +
            import.meta.env.VITE_TENANT_BASE_DOMAIN +
            ").",
        );
        setLoading(false);
        return;
      }

      if (!sharedFields.email || !sharedFields.password) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      try {
        await dispatch(login(sharedFields.email, sharedFields.password));
      } catch {
        setError("Invalid credentials. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── Signup ───────────────────────────────────────────────────────
    if (
      !sharedFields.email ||
      !sharedFields.password ||
      !signupFields.re_password ||
      !signupFields.nickname ||
      !signupFields.name ||
      !signupFields.first_lastname ||
      !signupFields.company_name ||
      !signupFields.schema_name
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (sharedFields.password !== signupFields.re_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const payload: SignupPayload = {
        ...sharedFields,
        ...signupFields,
      };
      await dispatch(signup(payload));
      setSignupSuccess(true);
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Signup success view ────────────────────────────────────────────
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Account Created!</h2>
            <p className="text-muted-foreground mb-6">
              An activation link has been sent to your email address. Please
              check your inbox and click the link to activate your account.
            </p>
            <button
              type="button"
              onClick={() => {
                setSignupSuccess(false);
                setIsLogin(true);
              }}
              className="text-primary hover:underline font-medium text-sm"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main auth form ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Landing */}
        <div className="mb-6">
          <Link
            to={getPath("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ERP System</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
          {isLogin && currentTenant && (
            <p className="text-xs text-primary mt-1 font-medium">
              Tenant: {currentTenant}
            </p>
          )}
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <h2 className="text-xl font-semibold text-center mb-6">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          {error && (
            <div className="p-3 mb-4 text-sm rounded-lg bg-red-100 text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={sharedFields.email}
                  name="email"
                  onChange={handleSharedChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Signup-only: Name fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={signupFields.name}
                        onChange={handleSignupChange}
                        placeholder="John"
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="first_lastname"
                      className="block mb-2 text-sm font-medium"
                    >
                      First Last Name
                    </label>
                    <input
                      id="first_lastname"
                      type="text"
                      value={signupFields.first_lastname}
                      name="first_lastname"
                      onChange={handleSignupChange}
                      placeholder="Doe"
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Nickname */}
                <div>
                  <label
                    htmlFor="nickname"
                    className="block mb-2 text-sm font-medium"
                  >
                    Nickname
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="nickname"
                      type="text"
                      value={signupFields.nickname}
                      name="nickname"
                      onChange={handleSignupChange}
                      placeholder="johndoe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="company_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="company_name"
                      type="text"
                      value={signupFields.company_name}
                      name="company_name"
                      onChange={handleSignupChange}
                      placeholder="Acme Inc."
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Schema Name (subdomain) */}
                <div>
                  <label
                    htmlFor="schema_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Subdomain
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="schema_name"
                      type="text"
                      value={signupFields.schema_name}
                      name="schema_name"
                      onChange={(e) => {
                        let cleaned = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "");
                        setSignupFields((prev) => ({
                          ...prev,
                          [e.target.name]: cleaned,
                        }));
                      }}
                      placeholder="acme"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your app will be available at{" "}
                    <span className="font-medium">
                      {signupFields.schema_name || "yourcompany"}.
                      {import.meta.env.VITE_TENANT_BASE_DOMAIN}
                    </span>
                  </p>
                </div>
              </>
            )}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={sharedFields.password}
                  name="password"
                  onChange={handleSharedChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm"
                  className="block mb-2 text-sm font-medium"
                >
                  sharedFields Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    name="re_password"
                    value={signupFields.re_password}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <PrimaryButton disabled={loading} type="submit" className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing…
                </span>
              ) : isLogin ? (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              ) : (
                "Create Account"
              )}
            </PrimaryButton>
          </form>

          {/* Toggle Login / Signup */}
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError(null);
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="mt-4 text-center text-sm">
              <Link
                to={getPath("/auth/forgot-password")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
