import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@/pages/Home";
import { Employees } from "@pages/Employees";
import { Clients } from "@pages/Clients";
import { Inventory } from "@pages/Inventory";
import EmployeeDetail from "./pages/Employees/EmployeeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;