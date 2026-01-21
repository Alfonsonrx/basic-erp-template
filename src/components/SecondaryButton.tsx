"use client";

import React from "react";

export const SecondaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, disabled, className }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      disabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-[#FAFAFA] text-[#282D32] hover:bg-gray-200"
    } ${className}`}
  >
    {children}
  </button>
);
