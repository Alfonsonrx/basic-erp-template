import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Home,
  Users,
  ChevronsLeft,
  ChevronsRight,
  NotebookText,
  Calendar,
  Box,
  IdCard,
  Settings,
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { LinkButton } from "@components/Buttons/LinkButton";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  
  // Helper to generate language-prefixed paths
  const getPath = (path: string) => `/${lang}${path}`;

  const navItems = [
    { to: getPath("/dashboard"), icon: <Home className="mx-2 h-6 w-6" />, label: t("navigation.home") },
    { to: getPath("/team"), icon: <IdCard className="mx-2 h-6 w-6" />, label: t("navigation.team") },
    {
      to: getPath("/customers"),
      icon: <Users className="mx-2 h-6 w-6" />,
      label: t("navigation.customers"),
    },
    {
      to: getPath("/projects"),
      icon: <NotebookText className="mx-2 h-6 w-6" />,
      label: t("navigation.projects"),
    },
    {
      to: getPath("/inventory"),
      icon: <Box className="mx-2 h-6 w-6" />,
      label: t("navigation.inventory"),
    },
    {
      to: getPath("/appointments"),
      icon: <Calendar className="mx-2 h-6 w-6" />,
      label: t("navigation.appointments"),
    },
  ];

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
            <span className="font-bold">{t("actions.close")}</span>
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

      {/* Settings link – icon always visible, label hidden when closed */}
      <div className="mt-auto">
        <LinkButton
          to={getPath("/settings")}
          className={`hover:bg-card transition-colors py-3 rounded-md w-full ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <Settings className="mx-2 h-6 w-6" />
          <span className={isOpen ? "block" : "hidden"}>{t("navigation.settings")}</span>
        </LinkButton>
      </div>
    </aside>
  );
};

export default Sidebar;
