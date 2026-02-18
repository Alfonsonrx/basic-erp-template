import themeReducer from './theme/themeSlice';
import authReducer from './auth/authSlice';
import permissionsReducer from './permissions/permissionsSlice';
import localeReducer from './locale/localeSlice';
import tenantReducer from './tenant/tenantSlice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  auth: authReducer,
  theme: themeReducer,
  permissions: permissionsReducer,
  locale: localeReducer,
  tenant: tenantReducer,
});
