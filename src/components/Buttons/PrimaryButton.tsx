"use client";

import React from "react";

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, disabled, className }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
      disabled
        ? "bg-muted text-primary-foreground hover:bg-bg-muted-foreground cursor-not-allowed"
        : "bg-primary text-foreground hover:bg-primary/90"
    } ${className}`}
  >
    {children}
  </button>
);
