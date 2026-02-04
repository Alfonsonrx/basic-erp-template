import { useState, useMemo } from "react";
import { Modal } from "@components/ui/Modal";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import { IconButton } from "@components/Buttons/IconButton";
import { dummyTeammates } from "@/dummyData/projects";
import type { ProjectItem, TeammateItem } from "@types";
import { Plus, X, User } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (project: ProjectItem & { assigned: number[] }) => void;
}

export function CreateProjectModal({ open, onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<ProjectItem["status"]>("pending");
  const [type, setType] = useState("");
  const [selectedTeammates, setSelectedTeammates] = useState<TeammateItem[]>([]);
  const [selectValue, setSelectValue] = useState("");

  // Get unselected teammates for the dropdown
  const availableTeammates = useMemo(() => {
    const selectedIds = new Set(selectedTeammates.map((t) => t.id));
    return dummyTeammates.filter((t) => !selectedIds.has(t.id));
  }, [selectedTeammates]);

  const addTeammate = (teammateId: string) => {
    const id = Number(teammateId);
    const teammate = dummyTeammates.find((t) => t.id === id);
    if (teammate && !selectedTeammates.find((t) => t.id === id)) {
      setSelectedTeammates((prev) => [...prev, teammate]);
    }
    setSelectValue("");
  };

  const removeTeammate = (id: number) => {
    setSelectedTeammates((prev) => prev.filter((t) => t.id !== id));
  };

  const resetForm = () => {
    setName("");
    setStartDate("");
    setDeadline("");
    setStatus("pending");
    setType("");
    setSelectedTeammates([]);
    setSelectValue("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assigned = selectedTeammates.map((t) => t.id);
    const newProject: ProjectItem = {
      id: Date.now(),
      name,
      startDate,
      deadline,
      status,
      type,
      tasks_quantity: 0,
      personal_assigned: assigned.length,
    };

    onCreate?.({ ...newProject, assigned });
    console.log("Created project", newProject, "assigned teammates", assigned);

    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">
            Project Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter project name"
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Status & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectItem["status"])}
              required
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              placeholder="e.g. Web, App, Design"
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Team Members */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Assign Team Members
          </label>

          {/* Select dropdown - only shows unselected teammates */}
          <select
            value={selectValue}
            onChange={(e) => addTeammate(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-3"
            disabled={availableTeammates.length === 0}
          >
            <option value="">
              {availableTeammates.length === 0
                ? "All teammates assigned"
                : "Select a teammate to add..."}
            </option>
            {availableTeammates.map((teammate) => (
              <option key={teammate.id} value={teammate.id}>
                {teammate.name} ({teammate.role})
              </option>
            ))}
          </select>

          {/* Selected teammates list */}
          {selectedTeammates.length > 0 && (
            <div className="border border-border rounded-md bg-background">
              <div className="px-3 py-2 border-b border-border bg-secondary/50">
                <span className="text-xs font-medium text-muted-foreground">
                  {selectedTeammates.length} member
                  {selectedTeammates.length !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="divide-y divide-border max-h-[200px] overflow-y-auto">
                {selectedTeammates.map((teammate) => (
                  <div
                    key={teammate.id}
                    className="flex items-center justify-between px-3 py-2 hover:bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{teammate.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {teammate.role}
                        </p>
                      </div>
                    </div>
                    <IconButton
                      icon={X}
                      onClick={() => removeTeammate(teammate.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      aria-label={`Remove ${teammate.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTeammates.length === 0 && availableTeammates.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Select teammates from the dropdown above to assign them to this
              project.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <SecondaryButton type="button" onClick={handleClose} className="flex-1">
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" className="flex-1">
            <Plus className="w-4 h-4" />
            Create Project
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

export default CreateProjectModal;
