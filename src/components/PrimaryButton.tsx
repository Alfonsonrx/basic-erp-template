"use client";

import React from "react";

export const PrimaryButton: React.FC<{
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
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-[#004643] text-[#FAFAFA] hover:bg-[#00352e]"
    } ${className}`}
  >
    {children}
  </button>
);