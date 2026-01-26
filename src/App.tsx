import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@pages/home";
import { Inventory } from "@pages/inventory";
import { AddCustomer, CustomerDetail, Customers } from "@pages/customers";
import { Team, TeammateDetail } from "@pages/team";
import { Projects, ProjectDetail, CreateProject } from "@pages/projects";
import { AuthPage, ForgotPassword } from "@pages/auth";
import AuthLayout from "@containers/AuthLayout";
import PrivateRoute from "@containers/PrivateRoute";
import { CalendarTest } from "@pages/calendartest";
import { ProfilePage } from "@pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="team" element={<Team />} />
            <Route path="team/:id" element={<TeammateDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="customers/add" element={<AddCustomer />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/create" element={<CreateProject />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="appointments" element={<CalendarTest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
