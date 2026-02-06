import { useSelector } from 'react-redux';
import type { RootState } from '@types';
import type { Permission } from '@reduxStore/permissions/permissionsSlice';

export function usePermissions() {
  const permissionsState = useSelector((state: RootState) => state.permissions);
  const authState = useSelector((state: RootState) => state.auth);
  
  const permissions = permissionsState.permissions;
  const role = permissionsState.role;
  const user = authState.user;

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    // Admin always has all permissions
    if (role === 'admin' || user?.role === 'admin') return true;
    return permissions.includes(permission);
  };

  // Check if user has any of the given permissions
  const hasAnyPermission = (perms: Permission[]): boolean => {
    if (role === 'admin' || user?.role === 'admin') return true;
    return perms.some(p => permissions.includes(p));
  };

  // Check if user has all of the given permissions
  const hasAllPermissions = (perms: Permission[]): boolean => {
    if (role === 'admin' || user?.role === 'admin') return true;
    return perms.every(p => permissions.includes(p));
  };

  return {
    permissions,
    role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: role === 'admin' || user?.role === 'admin',
    isManager: role === 'manager' || user?.role === 'manager',
    isEmployee: role === 'employee' || user?.role === 'employee',
  };
}

// Component-level permission check hook
export function useRequirePermission(permission: Permission): boolean {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
}
