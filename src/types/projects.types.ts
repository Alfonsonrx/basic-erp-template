import type { LucideIcon } from "lucide-react";

export interface ProjectBase {
  id: number;
  name: string;
}

export interface ProjectItem extends ProjectBase {
  startDate: string; // ISO
  deadline: string; // ISO
  status: "completed" | "cancelled" | "pending" | "critical";
  type: string;
}

export interface ProjectCard extends ProjectItem {
  tasks_quantity: number;
  personal_assigned: number;
}

export type TaskStatus = "todo" | "inprogress"| "approval" | "done";

export interface TaskItem {
  id: number;
  project?: ProjectBase | null;
  title: string;
  status: TaskStatus;
  deadline: string; // ISO
  hour?: string | null;
}

export interface Deal {
  id: number;
  amount: number;
  status: "deal" | "cancelled" | "pending";
  closingDate: string; // ISO string
  type: string;
  attachments: string[]; // URLs or names
  completed: boolean;
};

export interface Column {
  id: string;
  title: string;
  icon?: LucideIcon;
  tasks: TaskItem[];
}