import { dummyProjects } from "@/dummyData/projects";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import ProjectDetailedCard from "@components/projects/ProjectDetailedCard";
import type { ProjectCard } from "@types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

type StatusType = "all" | "pending" | "cancelled" | "completed" | "critical";

function Projects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");

  const fetchProjects = () => {
    setProjects([...dummyProjects]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="items-center justify-between my-4 mx-6">
      <div className="flex flex-wrap gap-3">
        <h2 className="text-4xl font-bold text-foreground">Projects</h2>
        <PrimaryButton>
          <Plus className="w-6 h-6" />
          Add new Project
        </PrimaryButton>
      </div>
      <div className="flex flex-wrap justify-between py-4 items-center gap-4">
        <div className="flex flex-wrap overflow-hidden gap-3 font-bold text-lg text-muted">
          <span
            onClick={() => setStatusFilter("all")}
            className={`${statusFilter == "all" ? "text-primary cursor-default" : "cursor-pointer"}`}
          >
            All
          </span>
          <span
            onClick={() => setStatusFilter("pending")}
            className={`${statusFilter == "pending" ? "text-primary cursor-default" : "cursor-pointer"}`}
          >
            Pending
          </span>
          <span
            onClick={() => setStatusFilter("cancelled")}
            className={`${statusFilter == "cancelled" ? "text-primary cursor-default" : "cursor-pointer"}`}
          >
            Cancelled
          </span>
          <span
            onClick={() => setStatusFilter("completed")}
            className={`${statusFilter == "completed" ? "text-primary cursor-default" : "cursor-pointer"}`}
          >
            Completed
          </span>
          <span
            onClick={() => setStatusFilter("critical")}
            className={`${statusFilter == "critical" ? "text-primary cursor-default" : "cursor-pointer"}`}
          >
            Critical
          </span>
        </div>
        <form className="w-4/12 min-w-48">
          <input
            type="text"
            placeholder="Search customers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          />
        </form>
      </div>
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((p) => (
          <ProjectDetailedCard project={p} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
