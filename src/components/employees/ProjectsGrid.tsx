import type { Project } from "@/dummyData/projects";
import { Card } from "@components/Card";

type Props = {
  initialProjects: Project[];
};

function ProjectsGrid({initialProjects}: Props) {
  
  return (
    <div className="max-h-48 overflow-scroll">
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
