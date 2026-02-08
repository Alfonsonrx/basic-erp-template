import { Link, useParams } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { PrimaryButton } from "@components/Buttons";

export default function NotFound() {
  const { lang } = useParams<{ lang?: string }>();
  
  // Helper to generate language-prefixed paths
  const getPath = (path: string) => lang ? `/${lang}${path}` : `/${path}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={getPath("/")}>
            <PrimaryButton className="flex items-center gap-2 justify-center w-full">
              <Home className="w-4 h-4" />
              Go Home
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
