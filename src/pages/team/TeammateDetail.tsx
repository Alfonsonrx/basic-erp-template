import { useParams, Link } from "react-router-dom";
import {
  PlusCircle,
  ArrowLeft,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { Card } from "@components/ui/Card";
import type { TeammateDetailData } from "@types";

const dummyTeammatesDetail: TeammateDetailData[] = [
  {
    id: 1,
    name: "Alice",
    first_lastname: "Johnson",
    second_lastname: "Smith",
    role: "Manager",
    email: "alice@example.com",
    phone: "+1-555-1234",
    revenue: 120000,
    status: "full-time",
    createdAt: "2023-01-15T09:00:00Z",
    tasks: [
      {
        id: 101,
        title: "Prepare quarterly report",
        deadline: "2024-07-10",
        hour: "10:00",
        status: "done",
      },
      {
        id: 102,
        title: "Team meeting",
        deadline: "2024-07-12",
        hour: "14:00",
        status: "done",
      },
    ],
    projects: [
      {
        id: 1,
        name: "Website Redesign",
        startDate: "2024-01-10",
        deadline: "2024-04-30",
        status: "pending",
        type: "Web",
        tasks_quantity: 20,
        personal_assigned: 4,
      },
      {
        id: 2,
        name: "Mobile App Launch",
        startDate: "2023-12-01",
        deadline: "2024-03-15",
        status: "completed",
        type: "App",
        tasks_quantity: 20,
        personal_assigned: 4,
      },
    ],
  },
];

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "job as call":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "part-time":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "full-time":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  fired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
      statusStyles[status] || "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

export default function TeammateDetail() {
  const { id } = useParams();
  const teammateId = Number(id);
  const teammate = dummyTeammatesDetail.find((e) => e.id === teammateId);

  if (!teammate) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Teammate not found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The teammate you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/team" className="mt-6 inline-block">
              <PrimaryButton>
                <ArrowLeft size={16} />
                Back to Team
              </PrimaryButton>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Back Navigation */}
      <Link
        to="/team"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Team
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {teammate.name} {teammate.first_lastname}{teammate.second_lastname ? ` ${teammate.second_lastname}` : ''}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-muted-foreground">{teammate.role}</p>
            <span className="text-muted-foreground">•</span>
            <StatusBadge status={teammate.status} />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <Calendar className="inline-block w-4 h-4 mr-1" />
          Joined on {new Date(teammate.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - About & Stats */}
        <div className="space-y-6">
          {/* About section */}
          <Card title="Contact Information">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${teammate.email}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {teammate.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${teammate.phone}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {teammate.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-sm font-medium">
                    ${teammate.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card title="Overview">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {teammate.tasks.length}
                </p>
                <p className="text-xs text-muted-foreground">Tasks</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {teammate.projects.length}
                </p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Tasks & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks section */}
          <Card>
            <div className="hidden md:flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">Tasks</h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/70"
              >
                <PlusCircle size={16} />
                Add Task
              </button>
            </div>
            {teammate.tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks assigned yet.</p>
                <p className="text-xs mt-1">
                  Click "Add Task" to assign a new task.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {teammate.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          task.status === "done"
                            ? "bg-green-500"
                            : task.status === "inprogress"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {task.deadline} @ {task.hour}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Projects section */}
          <Card title="Projects">
            {teammate.projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No projects assigned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teammate.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.type}
                        </p>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Start: {project.startDate}</span>
                        <span>Due: {project.deadline}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>{project.tasks_quantity} tasks</span>
                        <span>{project.personal_assigned} members</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
