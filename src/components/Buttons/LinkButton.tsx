// "use client"; 

import React from "react";
import { Link } from "react-router-dom";

export const LinkButton: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
}> = ({ to, children, className }) => (
  <Link to={to}>
    <button type="button" className={`flex items-center w-full gap-3 text-left ${className}`}>{children}</button>
  </Link>
);

