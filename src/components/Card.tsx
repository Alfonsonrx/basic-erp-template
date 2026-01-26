import React from "react";
import { IconButton } from "./Buttons";
import { ChevronRight } from "lucide-react";

export const Card: React.FC<{
  classname?: string;
  title?: string;
  children?: React.ReactNode;
  onFunctionClick?: () => void;
}> = ({ classname, title, children, onFunctionClick }) => (
  <div className={`rounded-lg shadow-lg p-4 flex flex-col group ${classname}`}>
    <div className="flex justify-between items-center ">
      <h3 className="text-lg font-semibold">{title}</h3>
      {onFunctionClick ? (
        <IconButton
          onClick={onFunctionClick}
          icon={ChevronRight}
          className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-border"
        />
      ) : null}
    </div>
    {children}
  </div>
);
