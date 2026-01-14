"use client";

import { useState } from "react";
import { Pencil, Trash2, PlusCircle, Eye } from "lucide-react";

type Employee = {
  id: number;
  name: string;
  role: string;
};

const dummyEmployees: Employee[] = [
  { id: 1, name: "Alice Johnson", role: "Manager" },
  { id: 2, name: "Bob Smith", role: "Developer" },
  { id: 3, name: "Carol Lee", role: "Designer" }
];

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [editingId, setEditingId] = useState<number | null>(null);

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Employees</h2>
        <button
          onClick={() => {
            // Placeholder for add employee logic
            const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
            setEmployees([...employees, { id: newId, name: "", role: "" }]);
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
            <span className="text-muted-foreground">{emp.role}</span>

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
                onClick={() => {
                  // Placeholder for view details logic
                  alert(`Viewing details for ${emp.name}`);
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-foreground rounded-md hover:bg-primary/90"
              >
                <Eye size={16} />
                Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;