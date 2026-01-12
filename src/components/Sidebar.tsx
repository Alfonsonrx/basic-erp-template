"use client";

import { Link } from "react-router-dom";
import { Home, Users, FileText, PlusCircle } from "lucide-react";

const navItems = [
  { to: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
  { to: "/employees", icon: <Users className="h-4 w-4" />, label: "Employees" },
  { to: "/clients", icon: <FileText className="h-4 w-4" />, label: "Clients" },
];

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 bg-muted text-muted-foreground h-full p-6 flex flex-col justify-between">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <button className="flex items-center w-full justify-start gap-3 text-left">
              {item.icon}
              {item.label}
            </button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Link to="/clients/add">
          <button className="flex items-center w-full gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Client
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;