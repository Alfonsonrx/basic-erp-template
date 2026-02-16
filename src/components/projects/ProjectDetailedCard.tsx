import type { ProjectItem } from "@types";
import {
  ListTree,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  project: ProjectItem;
};

const statusConfig: Record<string, {
  color: string;
  icon: typeof CheckCircle2;
  label: string;
  progress: number;
}> = {
  completed: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle2,
    label: "Completed",
    progress: 100
  },
  pending: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: Clock,
    label: "Pending",
    progress: 65
  },
  cancelled: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: XCircle,
    label: "Cancelled",
    progress: 0
  },
  critical: {
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: AlertCircle,
    label: "Critical",
    progress: 30
  },
};

function ProjectDetailedCard({ project }: Props) {
  const navigate = useNavigate();
  const status = statusConfig[project.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  const goToDetail = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="p-5 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group/item"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover/item:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{project.type}</p>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-foreground/70">Progress</span>
          <span className="font-medium text-foreground">{status.progress}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${status.progress}%` }}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 text-xs text-foreground/70 mb-4">
        <Calendar className="w-3.5 h-3.5" />
        <span>{project.startDate}</span>
        <span>→</span>
        <span>{project.deadline}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-foreground/70">
            <Users className="w-4 h-4" />
            <span>{project.personal_assigned}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-foreground/70">
            <ListTree className="w-4 h-4" />
            <span>{project.tasks_quantity}</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-foreground/50 opacity-0 group-hover/item:opacity-100 group-hover/item:text-primary transition-all" />
      </div>
    </div>
  );
}

export default ProjectDetailedCard;
