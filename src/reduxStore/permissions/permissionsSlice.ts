import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define all available permissions in the system
export type Permission = 
  // User permissions
  | 'users:view' | 'users:create' | 'users:edit' | 'users:delete'
  // Customer permissions
  | 'customers:view' | 'customers:create' | 'customers:edit' | 'customers:delete'
  // Project permissions
  | 'projects:view' | 'projects:create' | 'projects:edit' | 'projects:delete'
  // Team permissions
  | 'team:view' | 'team:create' | 'team:edit' | 'team:delete'
  // Inventory permissions
  | 'inventory:view' | 'inventory:create' | 'inventory:edit' | 'inventory:delete'
  // Appointment permissions
  | 'appointments:view' | 'appointments:create' | 'appointments:edit' | 'appointments:delete'
  // Billing permissions (admin only)
  | 'billing:view' | 'billing:manage'
  // Settings permissions
  | 'settings:view' | 'settings:manage'
  // Admin permissions
  | 'admin:access' | 'admin:permissions' | 'admin:audit';

// Role definitions with their default permissions
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    'users:view', 'users:create', 'users:edit', 'users:delete',
    'customers:view', 'customers:create', 'customers:edit', 'customers:delete',
    'projects:view', 'projects:create', 'projects:edit', 'projects:delete',
    'team:view', 'team:create', 'team:edit', 'team:delete',
    'inventory:view', 'inventory:create', 'inventory:edit', 'inventory:delete',
    'appointments:view', 'appointments:create', 'appointments:edit', 'appointments:delete',
    'billing:view', 'billing:manage',
    'settings:view', 'settings:manage',
    'admin:access', 'admin:permissions', 'admin:audit',
  ],
  manager: [
    'users:view', 'users:create', 'users:edit',
    'customers:view', 'customers:create', 'customers:edit', 'customers:delete',
    'projects:view', 'projects:create', 'projects:edit', 'projects:delete',
    'team:view', 'team:create', 'team:edit',
    'inventory:view', 'inventory:create', 'inventory:edit', 'inventory:delete',
    'appointments:view', 'appointments:create', 'appointments:edit', 'appointments:delete',
    'settings:view',
  ],
  employee: [
    'customers:view', 'customers:create', 'customers:edit',
    'projects:view', 'projects:create', 'projects:edit',
    'team:view',
    'inventory:view',
    'appointments:view', 'appointments:create', 'appointments:edit',
    'settings:view',
  ],
};

export interface PermissionsState {
  permissions: Permission[];
  role: 'admin' | 'manager' | 'employee' | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  permissions: [],
  role: null,
  isLoading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<{ permissions: Permission[]; role: string }>) {
      state.permissions = action.payload.permissions;
      state.role = action.payload.role as any;
    },
    loadPermissionsFromRole(state, action: PayloadAction<string>) {
      const role = action.payload;
      state.role = role as any;
      state.permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.employee;
    },
    addPermission(state, action: PayloadAction<Permission>) {
      if (!state.permissions.includes(action.payload)) {
        state.permissions.push(action.payload);
      }
    },
    removePermission(state, action: PayloadAction<Permission>) {
      state.permissions = state.permissions.filter(p => p !== action.payload);
    },
    clearPermissions(state) {
      state.permissions = [];
      state.role = null;
    },
    setPermissionsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPermissionsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setPermissions,
  loadPermissionsFromRole,
  addPermission,
  removePermission,
  clearPermissions,
  setPermissionsLoading,
  setPermissionsError,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
