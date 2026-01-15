"use client";

import { useState } from "react";
import { Pencil, Trash2, PlusCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { EmployeeDetailModal } from "@/components/EmployeeDetailModal";

type Employee = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
};

const dummyEmployees: Employee[] = [
  { id: 1, name: "Alice Johnson", role: "Manager", email: "alice@example.com", phone: "+1-555-1234" },
  { id: 2, name: "Bob Smith", role: "Developer", email: "bob@example.com", phone: "+1-555-5678" },
  { id: 3, name: "Carol Lee", role: "Designer", email: "carol@example.com", phone: "+1-555-9012" }
];

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    id: number,
    field: keyof Omit<Employee, "id">,
    value: string
  ) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      )
    );
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const openDetailModal = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Employees</h2>
        <button
          onClick={() => {
            // Placeholder for add employee logic
            const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
            setEmployees([...employees, { id: newId, name: "", role: "", email:"", phone:"" }]);
            setEditingId(newId);
          }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/90"
        >
          <PlusCircle size={16} />
          Add Employee
        </button>
      </div>

      <ul className="border rounded-md p-4 space-y-2 bg-background text-foreground">
        {employees.map((emp) => (
          <li key={emp.id} className="flex justify-between items-center">
            <span>{emp.name}</span>
            <span className="hidden md:block text-muted-foreground">{emp.role}</span>
            <span className="hidden md:block text-muted-foreground">{emp.email}</span>
            <span className="hidden md:block text-muted-foreground">{emp.phone}</span>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(editingId ? null : emp.id);
                }}
                className="text-green-600 hover:text-green-800"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-foreground rounded-md hover:bg-primary/90"
                onClick={() => openDetailModal(emp)}
              >
                <Eye size={16} />
                Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <EmployeeDetailModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee ?? undefined}
      />
    </div>
  );
}

export default Employees;