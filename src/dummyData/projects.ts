import type { Teammate, TaskItem, TeammateItem, ProjectItem, ProjectDetail, TeammateDetailData, TasksColumn } from "@types";
import { CheckCircle2, Clock } from "lucide-react";

export const dummyProjects: ProjectItem[] = [
  {
    id: 1,
    name: "Website Redesign",
    startDate: "2024-01-10",
    deadline: "2024-04-30",
    status: "pending",
    type: "Web",
    tasks_quantity: 20,
    personal_assigned: 4,

  },
  {
    id: 2,
    name: "Mobile App Launch",
    startDate: "2023-12-01",
    deadline: "2024-03-15",
    status: "completed",
    type: "App",
    tasks_quantity: 20,
    personal_assigned: 4,

  },
  {
    id: 3,
    name: "Website Redesign",
    startDate: "2024-01-10",
    deadline: "2024-04-30",
    status: "pending",
    type: "Web",
    tasks_quantity: 20,
    personal_assigned: 4,

  },
  {
    id: 4,
    name: "Mobile App Launch",
    startDate: "2023-12-01",
    deadline: "2024-03-15",
    status: "completed",
    type: "App",
    tasks_quantity: 20,
    personal_assigned: 4,

  }
];

export const tasks: TaskItem[] = [
  {
    id: 1,
    project: {
      id: 2,
      name: "Mobile App Launch"
    },
    title: "Create wireframes",
    status: "inprogress",
    deadline: "2026-01-19"
  },
  {
    id: 2,
    project: {
      id: 1,
      name: "Website Redesign"
    },
    title: "Develop frontend",
    status: "inprogress",
    deadline: "2026-02-10"
  },
  {
    id: 3,
    project: {
      id: 2,
      name: "Mobile App Launch"
    },
    title: "Testing",
    status: "inprogress",
    deadline: "2026-03-01"
  },
  {
    id: 4,
    project: {
      id: 1,
      name: "Website Redesign"
    },
    title: "Design UI",
    status: "inprogress",
    deadline: "2026-12-10"
  }
];

export const dummyTeammates: TeammateItem[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Manager",
    email: "alice@example.com",
    phone: "+1-555-1234",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Developer",
    email: "bob@example.com",
    phone: "+1-555-5678",
  },
  {
    id: 3,
    name: "Carol Lee",
    role: "Designer",
    email: "carol@example.com",
    phone: "+1-555-9012",
  },
];
export const dummyProrile: TeammateDetailData = {
  id: 1,
  name: "Alice",
  first_lastname: "Johnson",
  second_lastname: "Smith",
  role: "Manager",
  email: "alice@example.com",
  phone: "+1-555-1234",
  revenue: 400,
  status: "full-time",
  createdAt: "2026-01-05",
  tasks: tasks,
  projects: dummyProjects
};
export const dummyProjectColumns: TasksColumn[] = [
  {
    id: "todo",
    title: "To Do",
    total: 4,
    tasks: [
      {
        id: 1,
        title: "Combinatorics and validity",
        status: "todo",
        deadline: "2026-01-11",
      },
      {
        id: 2,
        title: "Hypothesis Testing",
        status: "todo",
        deadline: "2026-01-11",
      },
      {
        id: 3,
        title: "Time Series Analysis",
        status: "todo",
        deadline: "2026-01-11",
      },
      {
        id: 4,
        title: "Clustering Algorithms",
        status: "todo",
        deadline: "2026-01-11",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    total: 4,
    tasks: [
      {
        id: 5,
        title: "A/B Testing: Designing and Analyzing Experiments",
        status: "inprogress",
        deadline: "2026-01-11",
      },
      {
        id: 6,
        title: "Data Visualization",
        status: "inprogress",
        deadline: "2026-01-11",
      },
    ],
  },
  {
    id: "approval",
    title: "Approval",
    // icon: <Clock className="size-5 text-amber-500" />,
    icon: Clock,
    total: 4,
    tasks: [
      {
        id: 7,
        title: "Principal Component Analysis",
        status: "approval",
        deadline: "2026-01-11",
      },
      {
        id: 8,
        title: "Linear, Logistic, and Poisson Regression",
        status: "approval",
        deadline: "2026-01-11",
      },
      {
        id: 9,
        title: "One-Sample Test",
        status: "approval",
        deadline: "2026-01-11",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    // icon: <CheckCircle2 className="size-5 text-teal-500" />,
    icon: CheckCircle2,
    total: 4,
    tasks: [
      {
        id: 10,
        title: "Exponential Smoothing",
        status: "done",
        deadline: "2026-01-11",
      },
      {
        id: 11,
        title: "Real-world Dataset",
        status: "done",
        deadline: "2026-01-11",
      },
      {
        id: 12,
        title: "Support Vector Machines",
        status: "done",
        deadline: "2026-01-11",
      },
    ],
  },
];
export const employees: Teammate[] = [
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

// Dummy data for ProjectDetail (extends ProjectItem with additional fields)
export const dummyProjectDetails: ProjectDetail[] = [
  {
    // ProjectItem fields
    id: 1,
    name: "Website Redesign",
    startDate: "2024-01-10",
    deadline: "2024-04-30",
    status: "pending",
    type: "Web",
    tasks_quantity: 20,
    personal_assigned: 4,
    // ProjectDetail specific fields
    description: "Complete redesign of the company website with modern UI/UX principles, responsive design, and improved performance.",
    project_manager: { id: 1, name: "Alice Johnson" },
    assigned_to: [
      { id: 1, name: "Alice Johnson" },
      { id: 2, name: "Bob Smith" },
      { id: 3, name: "Carol Lee" }
    ],
    customer: 1,
    budget: 50000,
    notes: "Key milestones: Design phase by Feb 1, Development by Mar 15, Testing by Apr 15.",
    is_active: true
  },
  {
    // ProjectItem fields
    id: 2,
    name: "Mobile App Launch",
    startDate: "2023-12-01",
    deadline: "2024-03-15",
    status: "completed",
    type: "App",
    tasks_quantity: 20,
    personal_assigned: 4,
    // ProjectDetail specific fields
    description: "Launch of the new mobile application for iOS and Android platforms with full feature parity.",
    project_manager: { id: 2, name: "Bob Smith" },
    assigned_to: [
      { id: 2, name: "Bob Smith" },
      { id: 3, name: "Carol Lee" }
    ],
    customer: 2,
    budget: 75000,
    notes: "Successfully launched on both platforms. Post-launch monitoring in progress.",
    is_active: true
  },
  {
    // ProjectItem fields
    id: 3,
    name: "E-commerce Platform",
    startDate: "2024-02-01",
    deadline: "2024-06-30",
    status: "critical",
    type: "Web",
    tasks_quantity: 35,
    personal_assigned: 6,
    // ProjectDetail specific fields
    description: "Development of a full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.",
    project_manager: { id: 1, name: "Alice Johnson" },
    assigned_to: [
      { id: 1, name: "Alice Johnson" },
      { id: 2, name: "Bob Smith" },
      { id: 3, name: "Carol Lee" }
    ],
    customer: 1,
    budget: 120000,
    notes: "Critical issues with payment gateway integration need immediate attention.",
    is_active: true
  },
  {
    // ProjectItem fields
    id: 4,
    name: "Internal CRM System",
    startDate: "2024-03-01",
    deadline: "2024-08-15",
    status: "pending",
    type: "Internal",
    tasks_quantity: 15,
    personal_assigned: 3,
    // ProjectDetail specific fields
    description: "Custom CRM system for internal use to manage customer relationships, sales pipeline, and support tickets.",
    project_manager: { id: 3, name: "Carol Lee" },
    assigned_to: [
      { id: 2, name: "Bob Smith" },
      { id: 3, name: "Carol Lee" }
    ],
    customer: 1,
    budget: 45000,
    notes: "Requirements gathering phase completed. Awaiting approval for design phase.",
    is_active: true
  }
];

// Helper function to get project detail by ID
export const getProjectDetailById = (id: number): ProjectDetail | undefined => {
  return dummyProjectDetails.find((p) => p.id === id);
};