"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  PlusCircle,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const navItems = [
  { to: "/", icon: <Home className="h-6 w-6" />, label: "Home" },
  { to: "/employees", icon: <Users className="h-6 w-6" />, label: "Employees" },
  { to: "/clients", icon: <FileText className="h-6 w-6" />, label: "Clients" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Hidden on small screens, flex layout from lg breakpoint */
    <aside
      className={`flex bg-primary-foreground p-6 flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-200 ease-in-out`}
    >
      {/* Toggle button – always visible */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center mb-4 text-left w-full focus:outline-none"
      >
        {isOpen ? (
          <>
            <ChevronsLeft className="h-6 w-6" />
            <span className="ml-2">Close</span>
          </>
        ) : (
          <>
            <ChevronsRight className="h-6 w-6" />
          </>
        )}
      </button>

      {/* Navigation links – icons always visible, labels hidden when closed */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <button
              className={`flex items-center w-full gap-3 text-left ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              {item.icon}
              {/* Text label toggles with isOpen */}
              <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Add Client button – icon always visible, label hidden when closed */}
      <div className="mt-auto">
        <Link to="/clients/add">
          <button className="flex items-center justify-center w-full gap-2">
            <PlusCircle className="h-6 w-6" />
            <span className={isOpen ? "block" : "hidden"}>Add Client</span>
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
