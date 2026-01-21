import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  
  // Ensure a root element exists for the portal
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }
  
  const el = document.createElement("div");
  
  useEffect(() => {
    modalRoot!.appendChild(el);
    return () => {
      modalRoot!.removeChild(el);
    };
  }, [el, modalRoot]);
  if (!open) return null;
  
  const content = (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      {/* Modal panel */}
      <div
        className={`relative bg-background rounded-lg shadow-xl w-full max-h-full md:mx-4 p-6 z-10 max-w-5xl`}
      >
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>

          <button
            type="button"
            className="top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(content, el);
};
