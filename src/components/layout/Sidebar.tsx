import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  PlusCircle,
  ChevronsLeft,
  ChevronsRight,
  NotebookText,
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { LinkButton } from "@components/Buttons/LinkButton";

const navItems = [
  { to: "/", icon: <Home className="mx-2 h-6 w-6" />, label: "Home" },
  { to: "/team", icon: <Users className="mx-2 h-6 w-6" />, label: "Team" },
  {
    to: "/customers",
    icon: <FileText className="mx-2 h-6 w-6" />,
    label: "Customers",
  },
  {
    to: "/projects",
    icon: <NotebookText className="mx-2 h-6 w-6" />,
    label: "Projects",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Hidden on small screens, flex layout from lg breakpoint */
    <aside
      className={`flex bg-primary-foreground p-4 flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-200 ease-in-out`}
    >
      {/* Toggle button – always visible */}
      <PrimaryButton
        className=" justify-center px-0! mb-4 text-left w-full focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <>
            <ChevronsLeft className="h-6 w-6" />
            <span className="font-bold">Close</span>
          </>
        ) : (
          <>
            <ChevronsRight className="h-6 w-6" />
          </>
        )}
      </PrimaryButton>

      {/* Navigation links – icons always visible, labels hidden when closed */}

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <LinkButton
            key={item.to}
            to={item.to}
            className={`hover:bg-card transition-colors py-3 rounded-md ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            {item.icon}
            {/* Text label toggles with isOpen */}
            <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
          </LinkButton>
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
