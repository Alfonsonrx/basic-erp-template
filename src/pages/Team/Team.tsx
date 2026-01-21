import { useState } from "react";
import { PlusCircle, Eye } from "lucide-react";
import { TeammateDetailModal } from "@components/team/TeammateDetailModal";
import type { TeammateItem } from "@types";
import { dummyTeammates } from "@/dummyData/projects";



function Team() {
  const [teammates, setTeammates] = useState<TeammateItem[]>(dummyTeammates);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Modal state
  const [selectedTeammateId, setSelectedTeammateId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleChange = (
  //   id: number,
  //   field: keyof Omit<TeammateItem, "id">,
  //   value: string
  // ) => {
  //   setTeammates((prev) =>
  //     prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
  //   );
  // };

  // const deleteEmployee = (id: number) => {
  //   setTeammates(teammates.filter((e) => e.id !== id));
  //   if (editingId === id) setEditingId(null);
  // };

  const openDetailModal = (empId: number) => {
    setSelectedTeammateId(empId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Team</h2>
        <button
          onClick={() => {
            // Placeholder for add employee logic
            const newId = teammates.length
              ? Math.max(...teammates.map((t) => t.id)) + 1
              : 1;
            setTeammates([
              ...teammates,
              { id: newId, name: "", role: "", email: "", phone: "" },
            ]);
            setEditingId(newId);
          }}
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/90"
        >
          <PlusCircle size={16} />
          Add Teammate
        </button>
      </div>

      <ul className="border rounded-md p-4 space-y-2 bg-background text-foreground">
        {teammates.map((emp) => (
          <li key={emp.id} className="flex justify-between items-center">
            <span>{emp.name}</span>
            <span className="hidden md:block text-foreground">
              {emp.role}
            </span>
            <span className="hidden md:block text-foreground">
              {emp.email}
            </span>
            <span className="hidden md:block text-foreground">
              {emp.phone}
            </span>

            {/* Actions */}
            <div className="flex gap-2">
              {/* <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button> */}
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-foreground rounded-md hover:bg-primary/90"
                onClick={() => openDetailModal(emp.id)}
              >
                <Eye size={16} />
                Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <TeammateDetailModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTeammateId(null);
        }}
        teammate={selectedTeammateId ?? undefined}
      />
    </div>
  );
}

export default Team;
