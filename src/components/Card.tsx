import React from "react";

export const Card: React.FC<{
  classname?: string;
  title: string;
  children?: React.ReactNode;
}> = ({ classname, title, children }) => (
  <div className={`rounded-lg shadow-lg p-4 flex flex-col ${classname}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);
