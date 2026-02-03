import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton } from "@components/Buttons";
import { loginSuccess, signupSuccess } from "@reduxStore/auth/authSlice";

// Fake API call – resolves with dummy tokens after a short delay
const fakeAuth = (isLogin: boolean) => {
  return new Promise<{ access: string; refresh: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        access: "fakeAccessToken",
        refresh: "fakeRefreshToken",
      });
    }, 600);
  });
};

export default function AuthPage() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee"); // default role for sign‑up
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const tokens = await fakeAuth(isLogin);
      // Persist tokens in localStorage for simplicity
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      if (isLogin) {
        dispatch(loginSuccess({ access: tokens.access, refresh: tokens.refresh }));
      } else {
        // In a real app you might store the role too.
        dispatch(signupSuccess());
        dispatch(loginSuccess({ access: tokens.access, refresh: tokens.refresh })); // Is like this while being debug
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-card text-foreground">
        <h2 className="text-2xl font-bold text-center">{isLogin ? "Sign In" : "Create Account"}</h2>

        {error && (
          <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm" className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="role" className="block mb-1 text-sm font-medium">
                Role (for demo only)
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <PrimaryButton disabled={loading} type="submit">
            {loading ? "Processing…" : isLogin ? "Sign In" : "Create Account"}
          </PrimaryButton>
        </form>

        {!isLogin && (
          <div className="text-sm text-center mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="underline hover:text-primary"
            >
              Sign In
            </button>
          </div>
        )}

        {isLogin && (
          <div className="text-sm text-center mt-4">
            New here?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="underline hover:text-primary"
            >
              Create an account
            </button>
          </div>
        )}

        {isLogin && (
          <div className="text-sm text-center mt-4">
            <Link to="/auth/forgot-password" className="underline hover:text-primary">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
