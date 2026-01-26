import { Card } from "@components/Card";
import type { ProjectCard } from "@types";
import { ListTree, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  project: ProjectCard;
};

function ProjectDetailedCard({ project }: Props) {
  let navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/projects/${project.id}`);
  };
  return (
    <Card
      title={project.name}
      classname="bg-card gap-2"
      onFunctionClick={goToDetail}
    >
      {/* <h2 className="text-lg font-semibold mb-2">{project.name}</h2> */}
      <span className="text-sm">{project.status.toLocaleUpperCase()}</span>
      <span className="text-sm">Project Type: {project.type}</span>
      <div className="flex flex-col">
        <span className="text-sm">Start Date: {project.startDate}</span>
        <span className="text-sm">Deadline: {project.deadline}</span>
      </div>
      <div className="flex flex-wrap gap-1 justify-between">
        <span className="flex gap-1 items-center">
          <User className="w-5 h-5" /> {project.personal_assigned} People
          assigned
        </span>
        <span className="flex gap-1 items-center">
          <ListTree className="w-5 h-5" />
          {project.tasks_quantity} Tasks
        </span>
      </div>
    </Card>
  );
}

export default ProjectDetailedCard;
