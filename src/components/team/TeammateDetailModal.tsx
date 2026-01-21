
import { PlusCircle } from "lucide-react";
import { Modal } from "../Modal";
import TaskTable from "./TaskTable";
import type { Project, TaskItem } from "@types";
import ProjectsGrid from "./ProjectsGrid";
import { Link } from "react-router-dom";

export interface TeammateDetailProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  revenue: number;
  status: "new" | "job as call" | "part-time" | "full-time" | "fired";
  createdAt: string; // ISO
  tasks: TaskItem[];
  projects: Project[];
}

type Props = {
  open: boolean;
  onClose: () => void;
  teammate?: number | null;
};

export const TeammateDetailModal: React.FC<Props> = ({
  open,
  onClose,
  teammate,
}) => {
  // If no teammate data, just show an empty modal (or nothing)
  if (!teammate)
    return <Modal open={open} onClose={onClose} children={<></>} />;

  const {
    name,
    role,
    email,
    phone,
    revenue,
    status,
    createdAt,
    tasks,
    projects,
  }: TeammateDetailProps = {
    name: "Jane Doe",
    role: "Senior Product Manager",
    email: "jane.doe@example.com",
    phone: "+1‑555‑987‑6543",
    revenue: 275000,
    status: "full-time",
    createdAt: "2022-04-12T09:30:00Z",
    tasks: [
      {
        id: 101,
        title: "Finalize Q3 roadmap",
        date: "2024‑08‑01",
        hour: "10:00",
        status: "todo",
      },
      {
        id: 102,
        project: { id: 1, name: "Website Redesign" },
        title: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "done",
      },

      {
        id: 103,
        project: { id: 2, name: "Mobile App Launch" },
        title: "Finalize Q3 roadmap",
        date: "2024‑08‑01",
        hour: "10:00",
        status: "todo",
      },
      {
        id: 104,
        project: { id: 1, name: "Website Redesign" },
        title: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "done",
      },
      {
        id: 105,
        project: { id: 2, name: "Mobile App Launch" },
        title: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "inprogress",
      },
    ],
    projects: [
      {
        id: 201,
        name: "Create the landing page",
        startDate: "2024‑08‑01",
        deadline: "2025‑08‑01",
        status: "completed",
        type: "Enterprise Subscription",
      },
      {
        id: 202,
        name: "Create the landing page",
        startDate: "2024‑08‑01",
        deadline: "2025‑08‑01",
        status: "pending",
        type: "Add‑on Package",
      },
      {
        id: 203,
        name: "Create the landing page",
        startDate: "2024‑08‑01",
        deadline: "2025‑08‑01",
        status: "completed",
        type: "Enterprise Subscription",
      },
      {
        id: 204,
        name: "Create the landing page",
        startDate: "2024‑08‑01",
        deadline: "2025‑08‑01",
        status: "pending",
        type: "Add‑on Package",
      },
      {
        id: 205,
        name: "Create the landing page",
        startDate: "2024‑08‑01",
        deadline: "2025‑08‑01",
        status: "completed",
        type: "Enterprise Subscription",
      },
    ],
  };

  return (
    <Modal open={open} onClose={onClose} title="Detalles">
      <div className="text-foreground mt-2 md:my-6 max-h-128 md:max-h-full overflow-scroll">
        {/* Info content */}
        <div className="flex flex-col md:flex-row gap-2 ">
          <div className="flex md:flex-col gap-2 ">
            {/* Header */}
            <div className="bg-card p-4 grow nd:shrink">
              <h2 className="text-3xl font-bold">{name}</h2>
              <p className=" mt-1">{role}</p>
              <p className="text-sm  mt-1">
                Joined on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* About section */}
            <section className="bg-card p-4 grow hidden md:block">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm ">
                <li>
                  <strong>Email:</strong> {email}
                </li>
                <li>
                  <strong>Phone:</strong> {phone}
                </li>
                <li>
                  <strong>Revenue:</strong> ${revenue.toLocaleString()}
                </li>
                <li>
                  <strong>Status:</strong> {status}
                </li>
              </ul>
            </section>
          </div>

          {/* Deals column */}
          <div className="flex flex-col gap-2 w-full">
            {/* Tasks section */}
            <section className="p-6 grow bg-card">
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

              {tasks.length === 0 ? (
                <p className="text-sm ">No tasks assigned.</p>
              ) : (
                <TaskTable initialTasks={tasks} />
              )}
            </section>
            {/* Deals section */}
            <section className="p-4 bg-card">
              <h3 className="text-xl font-semibold">Projects</h3>

              {projects.length === 0 ? (
                <p className="text-sm ">No deals recorded.</p>
              ) : (
                <ProjectsGrid initialProjects={projects} />
              )}
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link to={`/employees/${teammate}`}>
        <button
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/70"
        >
          <PlusCircle size={16} />
          See details
        </button>
        </Link>
      </div>
    </Modal>
  );
};
