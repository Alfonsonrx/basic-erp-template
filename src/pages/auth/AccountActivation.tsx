import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PrimaryButton } from "@components/Buttons";
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

type ActivationState = "loading" | "success" | "error" | "resend";

export default function AccountActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || "";
  
  const [state, setState] = useState<ActivationState>("loading");
  const [resendEmail, setResendEmail] = useState(email);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setState("error");
      setErrorMessage("Invalid activation link. Please check your email or request a new activation link.");
      return;
    }

    // Simulate activation API call
    const activateAccount = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        const success = Math.random() > 0.3; // 70% success rate for demo
        
        if (success) {
          setState("success");
        } else {
          setState("error");
          setErrorMessage("This activation link has expired or is invalid. Please request a new one.");
        }
      } catch (error) {
        setState("error");
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    };

    activateAccount();
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendLoading(true);

    if (!resendEmail) {
      setErrorMessage("Please enter your email address.");
      setResendLoading(false);
      return;
    }

    // Simulate resend API call
    setTimeout(() => {
      setResendLoading(false);
      setResendSuccess(true);
    }, 1500);
  };

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Activating your account...</h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we verify your activation link.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Account Activated!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Your account has been successfully activated. You can now sign in and start using the system.
            </p>
            <Link to="/auth">
              <PrimaryButton className="w-full">
                Sign In Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </PrimaryButton>
            </Link>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Activation Failed</h3>
            <p className="text-muted-foreground text-sm mb-6">
              {errorMessage}
            </p>
            
            {/* Resend Form */}
            {!resendSuccess ? (
              <form onSubmit={handleResend} className="space-y-4 text-left">
                <div>
                  <label htmlFor="resend-email" className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="resend-email"
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <PrimaryButton disabled={resendLoading} type="submit" className="w-full">
                  {resendLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Resend Activation Link
                    </span>
                  )}
                </PrimaryButton>
              </form>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-700 dark:text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  A new activation link has been sent to <strong>{resendEmail}</strong>.
                  Please check your inbox.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Account Activation</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {state === "loading" && "Verifying your account..."}
            {state === "success" && "Your account is ready!"}
            {state === "error" && "We need to verify your email"}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {renderContent()}

          {/* Back to Sign In - shown in all states except success */}
          {state !== "success" && (
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Link 
                to="/auth" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Need help? Contact our support team at{" "}
          <a href="mailto:support@example.com" className="text-primary hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
