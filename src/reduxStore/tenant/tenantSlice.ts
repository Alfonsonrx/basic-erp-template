import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TenantState {
  /** Current tenant subdomain (e.g. "acme"), null when on public domain */
  currentTenant: string | null;
  /** Whether the user is on a tenant subdomain */
  isOnTenantSubdomain: boolean;
  /** Full tenant API base URL (e.g. "http://acme.localhost:8000") */
  tenantApiBaseUrl: string;
  /** Full public API base URL (e.g. "http://localhost:8000") */
  publicApiBaseUrl: string;
}

const initialState: TenantState = {
  currentTenant: null,
  isOnTenantSubdomain: false,
  tenantApiBaseUrl: '',
  publicApiBaseUrl: '',
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant(state, action: PayloadAction<TenantState>) {
      state.currentTenant = action.payload.currentTenant;
      state.isOnTenantSubdomain = action.payload.isOnTenantSubdomain;
      state.tenantApiBaseUrl = action.payload.tenantApiBaseUrl;
      state.publicApiBaseUrl = action.payload.publicApiBaseUrl;
    },
  },
});

export const { setTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
