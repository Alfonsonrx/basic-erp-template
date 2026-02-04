import { Card } from "@components/ui/Card";
import { tasks, dummyProjects } from "@/dummyData/projects";
import { appointments } from "@/dummyData/appointments";
import CalendarComponent from "@components/calendar/CalendarComponent";
import { calendarAppointments } from "@/dummyData/appointments";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Briefcase,
  Target,
  ListTodo,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectCard } from "@types";

const statusStyles: Record<string, string> = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  critical:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
      statusStyles[status] || "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const ProjectCardItem = ({ project }: { project: ProjectCard }) => {
  // Calculate a mock progress based on status (in real app would be actual data)
  const progress = project.status === "completed" ? 100 : project.status === "pending" ? 65 : 30;

  return (
    <Link to={`/projects/${project.id}`}>
      <div className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md group">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
              {project.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">{project.type}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Due: {project.deadline}
            </span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </div>
          <div className="flex justify-between mt-2">
            <span>{project.tasks_quantity} tasks</span>
            <span>{project.personal_assigned} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function Home() {
  const tasksInProgress = tasks.filter((t) => t.status === "inprogress");
  const tasksCompleted = tasks.filter((t) => t.status === "done");
  const tasksTodo = tasks.filter((t) => t.status === "todo");

  // Loading Projects
  const userProjects = dummyProjects.slice(0, 4); // Limit to 4 projects

  // Gamification stats
  const totalTasks = tasks.length;
  const completedTasks = tasksCompleted.length;
  const projectProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const appointmentsCommitted =
    appointments.today.length + appointments.tomorrow.length;

  // Stats for display
  const stats = [
    {
      label: "Tasks Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "In Progress",
      value: tasksInProgress.length,
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      label: "To Do",
      value: tasksTodo.length,
      icon: ListTodo,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
  ];

  return (
    <div className="p-6 space-y-8 mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold text-primary">{userProjects.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Appointments Today</p>
            <p className="text-2xl font-bold text-primary">{appointments.today.length}</p>
          </div>
        </div>
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Objectives */}
          <Card title="Objectives" classname="bg-card">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Tasks Completed
                  </p>
                  <p className="font-medium">
                    {completedTasks} of {totalTasks}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Project Progress
                  </p>
                  <p className="font-medium">{projectProgress}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Appointments</p>
                  <p className="font-medium">
                    {appointmentsCommitted} committed
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Today's Tasks Summary */}
          <Card title="Today's Focus" classname="bg-card">
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-primary">
                {tasksInProgress.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                tasks in progress
              </p>
            </div>
            {tasksInProgress.length > 0 && (
              <div className="mt-4 space-y-2">
                {tasksInProgress.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-2 bg-background rounded text-sm"
                  >
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
                {tasksInProgress.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{tasksInProgress.length - 3} more tasks
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Projects */}
        <div className="lg:col-span-2">
          <Card
            title="Your Projects"
            classname="bg-card h-full "
            onFunctionClick={() => (window.location.href = "/projects")}
          >
            {userProjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p className="text-lg font-medium">No projects yet</p>
                <p className="text-sm mt-1">
                  Create your first project to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProjects.map((project) => (
                  <ProjectCardItem key={project.id} project={project} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Schedule Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule
        </h2>
        <CalendarComponent appointments={calendarAppointments} />
      </div>
    </div>
  );
}

export default Home;
