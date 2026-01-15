"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  // Ensure a root element exists for the portal
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  // const el = document.createElement("div");

  // useEffect(() => {
  //   modalRoot!.appendChild(el);
  //   return () => {
  //     modalRoot!.removeChild(el);
  //   };
  // }, [el, modalRoot]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        />
        {/* Modal panel */}
        <div className="relative bg-background rounded-lg shadow-xl max-w-3xl w-full mx-4 p-6 z-10">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div/>
  );

  // return ReactDOM.createPortal(content, el);
};