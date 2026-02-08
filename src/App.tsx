import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@pages/home";
import { Settings } from "@pages/settings";
import { Inventory } from "@pages/inventory";
import { CustomerDetail, Customers } from "@pages/customers";
import { Team, TeammateDetail } from "@pages/team";
import { Projects, ProjectDetail } from "@pages/projects";
import { AuthPage, ForgotPassword, AccountActivation } from "@pages/auth";
import { Billing, Permissions } from "@pages/admin";
import AuthLayout from "@containers/AuthLayout";
import PrivateRoute from "@containers/PrivateRoute";
import { ProtectedRoute } from "@containers/ProtectedRoute";
import { Appointments } from "@pages/appointments";
import { ProfilePage } from "@pages/profile";
import { NotFound } from "@pages/not-found";
import LanguageWrapper from "@containers/LanguageWrapper";
import LanguageRedirect from "@containers/LanguageRedirect";

// Main routes wrapped with language support
function AppRoutes() {
  return (
    <Routes>
      {/* Language-prefixed routes */}
      <Route path="/:lang/*" element={<LanguageWrapper />}>
        {/* Auth routes WITH language prefix (now translated!) */}
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="activate" element={<AccountActivation />} />
        </Route>
        
        {/* Protected app routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="team" element={<Team />} />
            <Route path="team/:id" element={<TeammateDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="settings" element={<Settings />} />

            {/* Admin-only routes */}
            <Route
              path="admin/billing"
              element={
                <ProtectedRoute requiredPermission="billing:manage">
                  <Billing />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/permissions"
              element={
                <ProtectedRoute requiredPermission="admin:permissions">
                  <Permissions />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Route>

      {/* 
        Catch-all: handles routes without language prefix.
        Examples: /profile, /settings, /auth -> redirects to /en/profile, etc.
      */}
      <Route path="/" element={<LanguageRedirect />} />

      {/* 404 Not Found - any unmatched URL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
