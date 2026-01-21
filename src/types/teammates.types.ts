import type { Deal, TaskItem } from "./projects.types";

export interface Teammate {
  id: number;
  name: string;
}

export interface TeammateItem extends Teammate {
  role: string
  email: string
  phone: string
}

export interface TeammateDetailData extends TeammateItem {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  revenue: number;
  status:
    | "new"
    | "job as call"
    | "part-time"
    | "full-time"
    | "fired";
  createdAt: string; // ISO
  tasks: TaskItem[];
  deals: Deal[];
};