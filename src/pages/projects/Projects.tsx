import { dummyProjects } from "@/dummyData/projects";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { SecondaryButton } from "@components/Buttons/SecondaryButton";
import ProjectDetailedCard from "@components/projects/ProjectDetailedCard";
import { CreateProjectModal } from "@components/projects/CreateProjectModal";
import type { ProjectCard } from "@types";
import { Plus, Search, Folder } from "lucide-react";
import { useEffect, useState } from "react";

type StatusType = "all" | "pending" | "cancelled" | "completed" | "critical";

const statusConfig: Record<StatusType, { label: string; color: string }> = {
  all: { label: "All", color: "text-foreground" },
  pending: { label: "Pending", color: "text-blue-600 dark:text-blue-400" },
  cancelled: { label: "Cancelled", color: "text-red-600 dark:text-red-400" },
  completed: { label: "Completed", color: "text-green-600 dark:text-green-400" },
  critical: { label: "Critical", color: "text-orange-600 dark:text-orange-400" },
};

function Projects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const handleCreateProject = (newProject: ProjectCard & { assigned: number[] }) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const fetchProjects = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setProjects([...dummyProjects]);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects based on search and status
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: projects.length,
    pending: projects.filter((p) => p.status === "pending").length,
    completed: projects.filter((p) => p.status === "completed").length,
    critical: projects.filter((p) => p.status === "critical").length,
  };

  const FilterTab = ({
    status,
    label,
  }: {
    status: StatusType;
    label: string;
  }) => {
    const isActive = statusFilter === status;
    return (
      <button
        onClick={() => setStatusFilter(status)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
        aria-pressed={isActive}
      >
        {label}
        {status !== "all" && (
          <span className="ml-2 text-xs opacity-70">
            ({projects.filter((p) => p.status === status).length})
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.total} total • {stats.pending} pending • {stats.critical} critical
          </p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Add New Project
        </PrimaryButton>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <FilterTab status="all" label="All" />
          <FilterTab status="pending" label="Pending" />
          <FilterTab status="critical" label="Critical" />
          <FilterTab status="completed" label="Completed" />
          <FilterTab status="cancelled" label="Cancelled" />
        </div>

        <form
          className="w-full lg:w-72"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search projects"
            />
          </div>
        </form>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-card rounded-lg animate-pulse border border-border"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <Folder className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">
            No projects found
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            {search || statusFilter !== "all"
              ? "Try adjusting your search terms or filters to find what you're looking for."
              : "Get started by creating your first project."}
          </p>
          {(search || statusFilter !== "all") && (
            <SecondaryButton
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </SecondaryButton>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <ProjectDetailedCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}

export default Projects;
