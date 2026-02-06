import type { ComponentType, ReactElement } from 'react';
import type { Permission } from '@reduxStore/permissions/permissionsSlice';
import { usePermissions } from '@hooks';

interface WithPermissionProps {
  // Add any props that the HOC might inject
}

export function withPermission<TProps extends WithPermissionProps>(
  Component: ComponentType<TProps>,
  requiredPermission: Permission
) {
  return function PermissionWrapper(props: TProps): ReactElement | null {
    const { hasPermission } = usePermissions();
    
    if (!hasPermission(requiredPermission)) {
      return null;
    }
    
    return <Component {...props} />;
  };
}

export default withPermission;
