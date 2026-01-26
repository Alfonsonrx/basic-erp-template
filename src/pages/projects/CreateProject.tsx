import { useState } from "react";
import { Link } from "react-router-dom";
import { dummyTeammates } from "@/dummyData/projects";

export interface ProjectBase {
  id: number;
  name: string;
}

export interface ProjectItem extends ProjectBase {
  startDate: string; // ISO
  deadline: string; // ISO
  status: "completed" | "cancelled" | "pending" | "critical";
  type: string;
}

interface CreateProjectProps {}

export default function CreateProject({}: CreateProjectProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<ProjectItem["status"]>("pending");
  const [type, setType] = useState("");
  const [assigned, setAssigned] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setAssigned((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: ProjectItem = {
      id: Date.now(),
      name,
      startDate,
      deadline,
      status,
      type,
    };
    console.log("Created project", newProject, "assigned teammates", assigned);
    // Reset form
    setName("");
    setStartDate("");
    setDeadline("");
    setStatus("pending");
    setType("");
    setAssigned([]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-card rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectItem["status"])}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <fieldset>
          <legend className="block text-sm font-medium mb-1">Assign Team Members</legend>
          {dummyTeammates.map((t) => (
            <label key={t.id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={assigned.includes(t.id)}
                onChange={() => handleCheckboxChange(t.id)}
                className="mr-1"
              />
              {t.name}
            </label>
          ))}
        </fieldset>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Create</button>
          <Link to="/projects" className="px-4 py-2 border rounded">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
