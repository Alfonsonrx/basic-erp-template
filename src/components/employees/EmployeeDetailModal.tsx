"use client";

import { PlusCircle } from "lucide-react";
import { Modal } from "../Modal";
import type { Task } from "./TaskTable";
import TaskTable from "./TaskTable";
import ProjectsTable from "./ProjectsTable";

type Project = {
  id: number;
  name: string;
  startDate: string; // ISO string
  deadline: string; // ISO string
  status: "completed" | "cancelled" | "pending";
  type: string;
};

export interface EmployeeDetailProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  revenue: number;
  status: "new" | "job as call" | "part-time" | "full-time" | "fired";
  createdAt: string; // ISO
  tasks: Task[];
  projects: Project[];
}

type Props = {
  open: boolean;
  onClose: () => void;
  employee?: number | null;
};

export const EmployeeDetailModal: React.FC<Props> = ({
  open,
  onClose,
  employee,
}) => {
  // If no employee data, just show an empty modal (or nothing)
  if (!employee)
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
  }: EmployeeDetailProps = {
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
        description: "Finalize Q3 roadmap",
        date: "2024‑08‑01",
        hour: "10:00",
        status: "completed",
        completed: true,
      },
      {
        id: 102,
        description: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "completed",
        completed: false,
      },

      {
        id: 103,
        description: "Finalize Q3 roadmap",
        date: "2024‑08‑01",
        hour: "10:00",
        status: "completed",
        completed: true,
      },
      {
        id: 104,
        description: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "completed",
        completed: false,
      },
      {
        id: 105,
        description: "Client demo for new feature",
        date: "2024‑08‑05",
        hour: "14:30",
        status: "completed",
        completed: false,
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
    <Modal open={open} onClose={onClose} size="5xl" title="Detalles">
      <div className="text-foreground mt-6">
        {/* Info content */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 ">
            {/* Header */}
            <div className="bg-card p-4">
              <h2 className="text-3xl font-bold">{name}</h2>
              <p className=" mt-1">{role}</p>
              <p className="text-sm  mt-1">
                Joined on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* About section */}
            <section className="bg-card p-4 grow">
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
              <div className="flex items-center justify-between mb-2">
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
            <section className="p-4 grow bg-card">
              <h3 className="text-xl font-semibold">Projects</h3>

              {projects.length === 0 ? (
                <p className="text-sm ">No deals recorded.</p>
              ) : (
                <ProjectsTable initialProjects={projects} />
              )}
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
};
