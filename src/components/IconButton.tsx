"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

export const IconButton: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: number; // px
  icon: LucideIcon;
}> = ({ onClick, disabled, className, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={` p-2 inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-foreground ${
      disabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-transparent hover:bg-primary"
    } ${className}`}
    // style={{ width: size, height: size }}
  >
    <Icon className="w-6 h-6" />
  </button>
);