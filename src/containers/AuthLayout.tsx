import ThemeApplier from "@components/layout/ThemeApplier";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="duration-300 ease-out h-screen bg-lighter-gray bg-background">
      <ThemeApplier />

      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar full width, above sidebar */}
        <main className="flex text-foreground overflow-hidden h-full">
          <div className="w-full overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
