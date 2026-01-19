
export const projects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    startDate: "2024-01-10T00:00:00Z",
    deadline: "2024-04-30T00:00:00Z",
    status: "pending",
    type: "Web"
  },
  {
    id: 2,
    name: "Mobile App Launch",
    startDate: "2023-12-01T00:00:00Z",
    deadline: "2024-03-15T00:00:00Z",
    status: "completed",
    type: "App"
  },
  {
    id: 3,
    name: "Website Redesign",
    startDate: "2024-01-10T00:00:00Z",
    deadline: "2024-04-30T00:00:00Z",
    status: "pending",
    type: "Web"
  },
  {
    id: 4,
    name: "Mobile App Launch",
    startDate: "2023-12-01T00:00:00Z",
    deadline: "2024-03-15T00:00:00Z",
    status: "completed",
    type: "App"
  }
];
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

export interface Employee {
  id: number;
  name: string;
}

export const tasks: TaskItem[] = [
  {
    id: 1,
    project: {
      id: 2,
      name: "Mobile App Launch"
    },
    title: "Create wireframes",
    status: "done",
    date: "2026-01-19"
  },
  {
    id: 2,
    project: {
      id: 1,
      name: "Website Redesign"
    },
    title: "Develop frontend",
    status: "inprogress",
    date: "2026-02-10"
  },
  {
    id: 3,
    project: {
      id: 2,
      name: "Mobile App Launch"
    },
    title: "Testing",
    status: "todo",
    date: "2026-03-01"
  },
  {
    id: 4,
    project: {
      id: 1,
      name: "Website Redesign"
    },
    title: "Design UI",
    status: "done",
    date: "2026-12-10"
  }
];

export const employees: Employee[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Lee" }
];

export const projectClients = new Map<number, string>([
  [1, "Acme Corp"],
  [2, "Globex Inc."]
]);

export const projectBudgets = new Map<number, number>([
  [1, 50000],
  [2, 75000]
]);