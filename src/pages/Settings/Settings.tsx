"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/types";
import { setTheme } from "@reduxStore/theme/themeSlice";
import { CardGrid } from "@/components/CardGrid";
import { PlusCircle, BarChart2, Box } from "lucide-react";

const themeOptions = [
  { value: "light-corporate", label: "Light Corporate" },
  { value: "dark-corporate", label: "Dark Corporate" },
  { value: "purple-dream", label: "Purple Dream" },
  { value: "green-forest", label: "Green Forest" },
];

export default function Settings() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as typeof themeOptions[number]["value"]));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400">Settings</h1>

      <div className="max-w-sm">
        <label htmlFor="theme-select" className="block mb-2 text-sm font-medium text-gray-700">
          Theme
        </label>
        <select
          id="theme-select"
          value={currentTheme}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {themeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Optional preview */}
      <CardGrid
        items={[
          {
            title: "Add Clients",
            icon: PlusCircle,
            link: "/clients/add",
          },
          {
            title: "View Reports",
            icon: BarChart2,
            link: "/reports",
          },
          {
            title: "Watch Inventory",
            icon: Box,
            link: "/inventory",
          },
        ]}
      />
    </div>
  );
}