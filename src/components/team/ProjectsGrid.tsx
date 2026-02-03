import { Card } from "@components/ui/Card";
import type { ProjectItem } from "@types";

type Props = {
  initialProjects: ProjectItem[];
};

function ProjectsGrid({initialProjects}: Props) {
  
  return (
    <div className="max-h-48 overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {initialProjects.map((p) => (
          <Card key={p.id} title={p.name} classname="bg-card">
            <h2>{p.status}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectsGrid;
