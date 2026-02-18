import { Link, useParams } from "react-router-dom";
import { ShieldAlert, LogIn, Home } from "lucide-react";

/**
 * Unauthorized page – shown when a 401 occurs and token refresh fails.
 */
export default function Unauthorized() {
  const { lang } = useParams<{ lang?: string }>();
  const prefix = lang ? `/${lang}` : "/en";

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Unauthorized
          </h1>

          <p className="text-muted-foreground mb-8">
            Your session has expired or you are not authorized to access this
            page.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to={`${prefix}/auth`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <LogIn className="w-4 h-4" />
              Log in again
            </Link>

            <Link
              to={`${prefix}/`}
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
