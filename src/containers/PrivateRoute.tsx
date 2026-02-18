import type { RootState } from "@types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { isOnTenantSubdomain } = useSelector(
    (state: RootState) => state.tenant,
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if (!isOnTenantSubdomain) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
