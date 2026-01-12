"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

export const IconButton: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: number; // px
  icon: LucideIcon;
}> = ({ onClick, disabled, className, size = 24, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      disabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-transparent hover:bg-[#00F5A0] text-[#282D32]"
    } ${className}`}
    style={{ width: size, height: size }}
  >
    <Icon className="w-full h-full" />
  </button>
);