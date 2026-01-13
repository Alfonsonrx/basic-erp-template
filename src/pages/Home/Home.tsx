"use client";

import { PlusCircle, BarChart2, Box } from "lucide-react";
import { CardGrid } from "@/components/CardGrid";
import { useSelector } from "react-redux";
import type { RootState } from "@types";

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
  const { pair } = useSelector((state: RootState) => state.theme);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">
        Welcome to the ERP
      </h1>
      <h1 className="text-3xl font-bold text-primary">
        {pair}
      </h1>
      <CardGrid items={quickStartItems} />
    </div>
  );
}

export default Home;
