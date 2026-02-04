import { useParams, Link } from "react-router-dom";
import {
  dummyProjects,
  dummyTeammates,
  projectClients,
  projectBudgets,
} from "@/dummyData/projects";
import type { ProjectCard } from "@types";
import { Card } from "@components/ui/Card";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import {
  ArrowLeft,
  Calendar,
  User,
  Briefcase,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Layers
} from "lucide-react";
import { KanbanBoard } from "@components/projects/kanban/ProjectKanban";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  completed: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle2,
    label: "Completed"
  },
  pending: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: Clock,
    label: "Pending"
  },
  cancelled: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertCircle,
    label: "Cancelled"
  },
  critical: {
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: AlertCircle,
    label: "Critical"
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

// Calculate project progress based on dummy data
const calculateProgress = () => {
  // This is a placeholder - in real app would calculate from actual task data
  return 65;
};

function ProjectDetail() {
  const { id } = useParams();
  const projectId = Number(id);

  const project: ProjectCard | undefined = dummyProjects.find(
    (p) => p.id === projectId,
  );
  const client = projectClients.get(projectId);
  const budget = projectBudgets.get(projectId);
  const progress = calculateProgress();

  if (!project) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Project not found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/projects" className="mt-6 inline-block">
              <PrimaryButton>
                <ArrowLeft size={16} />
                Back to Projects
              </PrimaryButton>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6  mx-auto">
      {/* Back Navigation */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground">
            <Layers className="inline-block w-4 h-4 mr-1" />
            {project.type}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card title="Progress" classname="bg-card">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Project Completion</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Info */}
        <div className="space-y-6">
          <Card title="Project Details" classname="bg-card">
            <div className="space-y-4">
              {/* Dates */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Timeline</p>
                  <p className="text-sm font-medium">
                    {project.startDate} → {project.deadline}
                  </p>
                </div>
              </div>

              {/* Client */}
              {client && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="text-sm font-medium">{client}</p>
                  </div>
                </div>
              )}

              {/* Budget */}
              {budget !== undefined && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">${budget.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card title="Overview" classname="bg-card">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {project.tasks_quantity}
                </p>
                <p className="text-xs text-muted-foreground">Total Tasks</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {project.personal_assigned}
                </p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Team */}
        <div className="lg:col-span-2">
          <Card title="Team Members" classname="bg-card h-full">
            {dummyTeammates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No team members assigned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dummyTeammates.map((teammate) => (
                  <div
                    key={teammate.id}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{teammate.name}</p>
                      <p className="text-xs text-muted-foreground">{teammate.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Tasks - Kanban Board */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default ProjectDetail;
