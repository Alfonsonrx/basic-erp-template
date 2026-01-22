import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@pages/home";
import { Inventory } from "@pages/inventory";
import { Customers } from "@pages/customers";
import { Team, TeammateDetail } from "@pages/team";
import { Projects } from "@pages/projects";
import { AuthPage, ForgotPassword } from "@pages/auth";
import AuthLayout from "@containers/AuthLayout";
import PrivateRoute from "@containers/PrivateRoute";

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
            <Route path="team" element={<Team />} />
            <Route path="team/:id" element={<TeammateDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="projects" element={<Projects />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
