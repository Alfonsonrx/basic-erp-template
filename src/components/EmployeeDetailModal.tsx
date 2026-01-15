"use client";

import { useEffect } from "react";
import { Modal } from "./Modal";
import EmployeeDetailView, {
  EmployeeDetailProps
} from "./EmployeeDetailView";

type Props = {
  open: boolean;
  onClose: () => void;
  employee?: EmployeeDetailProps | null;
};

export const EmployeeDetailModal: React.FC<Props> = ({
  open,
  onClose,
  employee
}) => {
  // If no employee data, don't render modal content
  if (!employee) return <Modal open={open} onClose={onClose} />;

  return (
    <Modal open={open} onClose={onClose}>
      <EmployeeDetailView {...employee} />
    </Modal>
  );
};