import { useParams, Link } from "react-router-dom";
import {
  dummyProjectDetails,
  dummyTeammates,
  dummyProjectColumns,
} from "@/dummyData/projects";
import type { ProjectDetailedItem, TasksColumn } from "@types";
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
  Layers,
} from "lucide-react";
import { KanbanBoard } from "@components/projects/kanban/ProjectKanban";

const statusConfig: Record<
  string,
  { color: string; icon: typeof CheckCircle2; label: string }
> = {
  completed: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle2,
    label: "Completed",
  },
  pending: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: Clock,
    label: "Pending",
  },
  cancelled: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertCircle,
    label: "Cancelled",
  },
  critical: {
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: AlertCircle,
    label: "Critical",
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

// Calculate task distribution from columns
const calculateTaskDistribution = (columns: TasksColumn[]) => {
  const total = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  if (total === 0)
    return { todo: 0, inprogress: 0, approval: 0, done: 0, total: 0 };

  return {
    todo: Math.round(
      ((columns.find((c) => c.id === "todo")?.tasks.length || 0) / total) * 100,
    ),
    inprogress: Math.round(
      ((columns.find((c) => c.id === "in-progress")?.tasks.length || 0) /
        total) *
        100,
    ),
    approval: Math.round(
      ((columns.find((c) => c.id === "approval")?.tasks.length || 0) / total) *
        100,
    ),
    done: Math.round(
      ((columns.find((c) => c.id === "completed")?.tasks.length || 0) / total) *
        100,
    ),
    total,
  };
};

function ProjectDetail() {
  const { id } = useParams();
  const projectId = Number(id);

  const project: ProjectDetailedItem | undefined = dummyProjectDetails.find(
    (p) => p.id === projectId,
  );
  const taskDistribution = calculateTaskDistribution(dummyProjectColumns);

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
            <h1 className="text-3xl font-bold text-foreground">
              {project.name}
            </h1>
            <StatusBadge status={project.status} />
            {!project.is_active && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                Inactive
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            <Layers className="inline-block w-4 h-4 mr-1" />
            {project.type}
          </p>
          {project.description && (
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              {project.description}
            </p>
          )}
        </div>
      </div>

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
              {project.customer && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Client ID</p>
                    <p className="text-sm font-medium">{project.customer}</p>
                  </div>
                </div>
              )}

              {/* Budget */}
              {project.budget !== undefined && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">
                      ${project.budget.toLocaleString()}
                    </p>
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

          {/* Notes */}
          {project.notes && (
            <Card title="Notes" classname="bg-card">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {project.notes}
              </p>
            </Card>
          )}
        </div>

        {/* Right Column - Team */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Bar - 4 Color Segmented */}
          <Card title="Task Progress" classname="bg-card">
            <div className="space-y-3">
              {/* Segmented Progress Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex">
                {/* Todo - Grey */}
                {taskDistribution.todo > 0 && (
                  <div
                    className="h-full bg-gray-400 dark:bg-gray-600 transition-all duration-500"
                    style={{ width: `${taskDistribution.todo}%` }}
                    title={`Todo: ${taskDistribution.todo}%`}
                  />
                )}
                {/* In Progress - Yellow/Orange */}
                {taskDistribution.inprogress > 0 && (
                  <div
                    className="h-full bg-amber-500 dark:bg-amber-600 transition-all duration-500"
                    style={{ width: `${taskDistribution.inprogress}%` }}
                    title={`In Progress: ${taskDistribution.inprogress}%`}
                  />
                )}
                {/* Approval - Blue */}
                {taskDistribution.approval > 0 && (
                  <div
                    className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-500"
                    style={{ width: `${taskDistribution.approval}%` }}
                    title={`Approval: ${taskDistribution.approval}%`}
                  />
                )}
                {/* Done - Green */}
                {taskDistribution.done > 0 && (
                  <div
                    className="h-full bg-green-500 dark:bg-green-600 transition-all duration-500"
                    style={{ width: `${taskDistribution.done}%` }}
                    title={`Done: ${taskDistribution.done}%`}
                  />
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap text-xs justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <span className="text-muted-foreground">
                      Todo ({taskDistribution.todo}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-600" />
                    <span className="text-muted-foreground">
                      In Progress ({taskDistribution.inprogress}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-600" />
                    <span className="text-muted-foreground">
                      Approval ({taskDistribution.approval}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-green-600" />
                    <span className="text-muted-foreground">
                      Done ({taskDistribution.done}%)
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-right">
                  Total Tasks: {taskDistribution.total}
                </p>
              </div>
            </div>
          </Card>
          {/* Project Manager */}
          <Card title="Project Manager" classname="bg-card">
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {project.project_manager.name}
                </p>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
            </div>
          </Card>

          {/* Assigned Team Members */}
          <Card title="Assigned Team Members" classname="bg-card">
            {project.assigned_to.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No team members assigned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.assigned_to.map((teammate) => (
                  <div
                    key={teammate.id}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{teammate.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Team Member
                      </p>
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
