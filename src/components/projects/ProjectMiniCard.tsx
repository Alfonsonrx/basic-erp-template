import { Card } from "@components/ui/Card";
import type { ProjectCard } from "@types";
import { useNavigate } from "react-router-dom";

type Props = {
  project: ProjectCard;
};

function ProjectMiniCard({ project }: Props) {
  let navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/projects/${project.id}`);
  };
  return (
    <Card
      key={project.id}
      title={project.name}
      classname="bg-card"
      onFunctionClick={goToDetail}
    >
      <h2>{project.status}</h2>
    </Card>
  );
}

export default ProjectMiniCard;
