"use client";

import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type CardItem = {
  title: string;
  icon: LucideIcon;
  link: string;
};

export const CardGrid: React.FC<{ items: CardItem[] }> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <Link key={item.title} to={item.link}>
        <button
          type="button"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:bg-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-48 w-full"
        >
          <item.icon className="h-12 w-12 text-primary mb-4" />
          <span className="text-base font-medium text-gray-800">{item.title}</span>
        </button>
      </Link>
    ))}
  </div>
);