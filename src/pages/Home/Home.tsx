"use client";

import { PlusCircle, BarChart2, Box } from "lucide-react";
import { CardGrid } from "@/components/CardGrid";

const quickStartItems = [
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
];

function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400">Welcome to the ERP</h1>
      <CardGrid items={quickStartItems} />
    </div>
  );
}

export default Home;