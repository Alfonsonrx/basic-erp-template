import type { LucideIcon } from "lucide-react";
import type { Teammate } from "./teammates.types";

export interface ProjectBase {
  id: number;
  name: string;
}

export interface ProjectItem extends ProjectBase {
  /* To list the projects */
  startDate: string; // ISO
  deadline: string; // ISO
  status: "completed" | "cancelled" | "pending" | "critical";
  type: string;
  tasks_quantity: number;
  personal_assigned: number;
}

export interface ProjectDetailedItem extends ProjectItem {
  /* To create/retrieve/update specific project */
  description: string;
  project_manager: Teammate;
  assigned_to: Teammate[]; // Teammates that are assigned to tasks of this project
  customer: number;
  budget: number;
  notes: string;
  is_active: boolean;
}

export type TaskStatus = "todo" |
  "inprogress" |
  "approval" |
  "done";

export interface TaskItem {
  id: number | null;
  project?: ProjectBase | null;
  title: string;
  status: TaskStatus;
  deadline: string; // ISO
  hour?: string | null;
}

export interface TaskDetail extends TaskItem {
  assigned_to: Teammate[];  // Teammates that are assigned this tasks
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

export interface TasksColumn {
  id: string;
  title: string;
  icon?: LucideIcon;
  total: number;
  tasks: TaskItem[];
}