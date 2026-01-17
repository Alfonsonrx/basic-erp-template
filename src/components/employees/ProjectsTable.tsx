import { List } from "lucide-react";
import { useState } from "react";

export type Project = {
  id: number;
  name: string;
  startDate: string; // ISO string
  deadline: string; // ISO string
  status: "completed" | "cancelled" | "pending";
  type: string;
};

type Props = {
  initialProjects: Project[];
};

function ProjectsTable({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  return (
    <div className="max-h-64 overflow-scroll">
      <table className="min-w-full border-collapse rounded-md shadow-sm">
        {/* <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wider text-foreground">
            <th className="px-4 py-2 ">Name</th>
            <th className="px-4 py-2 ">Start Date</th>
            <th className="px-4 py-2">Closing Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead> */}
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b py-0.5 items-center 4">
              <td className="px-4 py-2 w-full">{p.name}</td>
              <td className="px-4 py-2">{p.startDate}</td>
              <td className="px-4 py-2">{p.deadline}</td>

              <td className="px-4 py-2">{p.type}</td>

              <td className="px-4 py-2">{p.status}</td>

              <td className="px-4 py-2 gap-2">
                <button
                  onClick={() => {
                    // setEditingId(editingId ? null : p.id);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <List size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;
