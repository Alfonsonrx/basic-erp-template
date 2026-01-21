
interface ProjectItem {
  id: number;
  name: string;
}

export interface Project extends ProjectItem {
  startDate: string; // ISO
  deadline: string; // ISO
  status: "completed" | "cancelled" | "pending";
  type: string;
}

export interface TaskItem {
  id: number;
  project?: ProjectItem | null;
  title: string;
  status: "todo" | "inprogress" | "done";
  date: string; // ISO
  hour?: string | null
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