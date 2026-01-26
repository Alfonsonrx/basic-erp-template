import { useParams } from "react-router-dom";
import {
  dummyProjects,
  dummyTeammates,
  projectClients,
  projectBudgets,
} from "@/dummyData/projects";
import type { ProjectCard } from "@types";
import { Card } from "@components/Card";
import { User } from "lucide-react";
import { KanbanBoard } from "@components/projects/kanban/ProjectKanban";

function ProjectDetail() {
  const { id } = useParams();
  const projectId = Number(id);

  const project: ProjectCard | undefined = dummyProjects.find(
    (p) => p.id === projectId,
  );
  const client = projectClients.get(projectId);
  const budget = projectBudgets.get(projectId);

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <Card title={project.name} classname="bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <p>{project.status}</p>
            <h3 className="mt-2 text-lg font-semibold">Type</h3>
            <p>{project.type}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Dates</h3>
            <p>Start: {project.startDate}</p>
            <p>Deadline: {project.deadline}</p>
            {client && (
              <div className="mt-2">
                <h3 className="font-semibold">Client</h3>
                <p>{client}</p>
              </div>
            )}
            {budget !== undefined && (
              <div className="mt-2">
                <h3 className="font-semibold">Budget</h3>
                <p>${budget.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Team members */}
      <Card title="Team" classname="bg-card p-4">
        <ul className="space-y-2">
          {dummyTeammates.map((t) => (
            <li key={t.id} className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{t.name}</span> ({t.role})
            </li>
          ))}
        </ul>
      </Card>

      {/* Tasks */}
      <KanbanBoard />
    </div>
  );
}

export default ProjectDetail;
