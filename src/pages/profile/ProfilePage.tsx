import { useState } from "react";
import { 
  PlusCircle, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar, 
  User, 
  Check,
  X,
  Briefcase,
  LayoutList,
  Folder
} from "lucide-react";
import type { TeammateDetailData } from "@types";
import { dummyProrile } from "@/dummyData/projects";
import { Card } from "@components/ui/Card";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "job as call": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "part-time": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "full-time": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
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

export default function ProfilePage() {
  // For demo we use the first teammate as the logged‑in user
  const initial = dummyProrile as TeammateDetailData;
  const [user, setUser] = useState<TeammateDetailData>({ ...initial });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: name === "revenue" ? Number(value) : value }));
  };

  const saveChanges = () => {
    // In a real app this would hit an API; here we just keep local state
    setEditMode(false);
  };

  const cancelEdit = () => {
    setUser({ ...initial });
    setEditMode(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {user.name} {user.first_lastname}{user.second_lastname ? ` ${user.second_lastname}` : ''}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-muted-foreground">{user.role}</p>
            <span className="text-muted-foreground">•</span>
            {editMode ? (
              <select
                name="status"
                value={user.status}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                <option value="new">New</option>
                <option value="job as call">Job as Call</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
                <option value="fired">Fired</option>
              </select>
            ) : (
              <StatusBadge status={user.status} />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Edit buttons */}
        <div className="flex gap-2">
          {editMode ? (
            <>
              <SecondaryButton onClick={cancelEdit}>
                <X size={16} />
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={saveChanges}>
                <Check size={16} />
                Save Changes
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton onClick={() => setEditMode(true)}>
              <User size={16} />
              Edit Profile
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - About & Stats */}
        <div className="space-y-6">
          {/* About section */}
          <Card title="Contact Information">
            <div className="space-y-4">
              {/* First Name */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">First Name</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <p className="text-sm font-medium">{user.name}</p>
                  )}
                </div>
              </div>

              {/* First Lastname */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">First Lastname</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="first_lastname"
                      value={user.first_lastname}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <p className="text-sm font-medium">{user.first_lastname}</p>
                  )}
                </div>
              </div>

              {/* Second Lastname (optional) */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Second Lastname <span className="text-xs text-muted-foreground/60">(optional)</span></p>
                  {editMode ? (
                    <input
                      type="text"
                      name="second_lastname"
                      value={user.second_lastname || ''}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                      placeholder="Not provided"
                    />
                  ) : (
                    <p className="text-sm font-medium">{user.second_lastname || '-'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <a
                      href={`mailto:${user.email}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {user.email}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <a
                      href={`tel:${user.phone}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {user.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  {editMode ? (
                    <input
                      type="number"
                      name="revenue"
                      value={user.revenue}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm bg-background"
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      ${user.revenue.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card title="Overview">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {user.tasks.length}
                </p>
                <p className="text-xs text-muted-foreground">Tasks</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {user.projects?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Tasks & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks section */}
          <Card title="Tasks">
            <div className="flex justify-end mb-4">
              <PrimaryButton>
                <PlusCircle size={16} />
                Add Task
              </PrimaryButton>
            </div>
            {user.tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <LayoutList className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No tasks assigned yet.</p>
                <p className="text-xs mt-1">
                  Click "Add Task" to create a new task.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {user.tasks.map((task) => (
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
                      {task.project && (
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {task.project.name}
                        </span>
                      )}
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
            {(!user.projects || user.projects.length === 0) ? (
              <div className="text-center py-8 text-muted-foreground">
                <Folder className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No projects assigned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.projects.map((project) => (
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
