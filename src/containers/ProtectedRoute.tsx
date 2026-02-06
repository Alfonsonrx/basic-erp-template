import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@types';
import type { Permission } from '@reduxStore/permissions/permissionsSlice';
import { Card } from '@components/ui/Card';
import { ShieldAlert } from 'lucide-react';
import { PrimaryButton } from '@components/Buttons';
import { Link } from 'react-router-dom';
import { usePermissions } from '@hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredRole?: 'admin' | 'manager' | 'employee';
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission,
  requiredRole,
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { hasPermission, isAdmin, role } = usePermissions();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check role requirement
  if (requiredRole) {
    const userRole = role || user?.role;
    if (userRole !== requiredRole && !isAdmin) {
      return fallback || <AccessDenied />;
    }
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || <AccessDenied />;
  }

  return <>{children}</>;
}

// Access Denied Component
function AccessDenied() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Access Denied</h3>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <PrimaryButton>
                Go to Dashboard
              </PrimaryButton>
            </Link>
            <Link to="/settings">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                View Permissions
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Admin-only route wrapper
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
}

// Permission-based route wrapper
export function PermissionRoute({ 
  children, 
  permission 
}: { 
  children: React.ReactNode; 
  permission: Permission;
}) {
  return (
    <ProtectedRoute requiredPermission={permission}>
      {children}
    </ProtectedRoute>
  );
}

export default ProtectedRoute;
