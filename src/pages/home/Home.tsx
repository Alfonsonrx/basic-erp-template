import { Card } from "@components/ui/Card";
import { tasks, dummyProjects } from "@/dummyData/projects";
import { appointments } from "@/dummyData/appointments";
import CalendarComponent from "@components/calendar/CalendarComponent";
import { calendarAppointments } from "@/dummyData/appointments";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Briefcase,
  Target,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import ProjectDetailedCard from "@components/projects/ProjectDetailedCard";

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
        <div className="flex flex-col gap-6">
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
          <Card title="Today's Focus" classname="bg-card grow">
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
                {tasksInProgress.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-2 bg-background rounded text-sm"
                  >
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
                {tasksInProgress.length > 2 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{tasksInProgress.length - 2} more tasks
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map((project) => (
                  <ProjectDetailedCard key={project.id} project={project} />
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
