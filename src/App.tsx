import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import { Home } from "@/pages/Home";
import { Inventory } from "@pages/Inventory";
import { Customers } from "@pages/Customers";
import Team from "@pages/Team/Team";
import TeammateDetail from "@pages/Team/TeammateDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<TeammateDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
