import { useState } from "react";
import { PlusCircle, Eye, PaperclipIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { TeammateDetailModal } from "@components/team/TeammateDetailModal";
import type { TeammateItem } from "@types";
import { dummyTeammates } from "@/dummyData/projects";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import { IconButton } from "@components/Buttons/IconButton";

function Team() {
  const [search, setSearch] = useState("");
  const [teammates, setTeammates] = useState<TeammateItem[]>(dummyTeammates);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Modal state
  const [selectedTeammateId, setSelectedTeammateId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailModal = (empId: number) => {
    setSelectedTeammateId(empId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="items-center justify-between my-4 mx-6">
        <h2 className="text-4xl font-semibold mb-2">Team</h2>
        <div className="flex gap-2 flex-wrap">
          <form className="grow">
            <input
              type="text"
              placeholder="Search teammate…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            />
          </form>
          <div className="flex justify-center gap-2 flex-wrap">
            <SecondaryButton>
              <PaperclipIcon size={16} />
              Export
            </SecondaryButton>
            <PrimaryButton
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
            >
              <PlusCircle size={16} />
              Add Teammate
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card max-h-96 overflow-auto border-y border-border ">
        <table className="min-w-full divide-y divide-border border-b">
          <thead>
            <tr className="text-center text-xs font-medium uppercase tracking-wider">
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 hidden md:table-cell">Email</th>
              <th className="px-4 py-2 hidden md:table-cell">Phone</th>
              <th className="px-4 py-2 hidden md:table-cell">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {teammates.map((teammate) => (
              <tr
                key={teammate.id}
                className="text-center hover:bg-background/10 transition-colors"
              >
                <td>{teammate.name}</td>
                <td className=" hidden md:table-cell">
                  {teammate.email}
                </td>
                <td className=" hidden md:table-cell">
                  {teammate.phone ? teammate.phone : "None"}
                </td>
                <td className=" hidden md:table-cell">
                  {teammate.role}
                </td>
                <td className="flex gap-2 justify-center my-2">
                  <PrimaryButton onClick={() => openDetailModal(teammate.id)}>
                    <Eye size={16} />
                    Details
                  </PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 flex justify-end my-2 mx-6 gap-1">
          <IconButton className="bg-primary/50" icon={ArrowLeft} />
          <IconButton className="bg-primary/50" icon={ArrowRight} />
        </div>
      </div>

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
