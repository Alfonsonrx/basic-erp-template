import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@/pages/Home";
import { Employees } from "@pages/Employees";
import { Clients } from "@pages/Clients";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;