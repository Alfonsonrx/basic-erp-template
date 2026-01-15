"use client";

import { useParams } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  FileText,
  PlusCircle
} from "lucide-react";

// Dummy data for demonstration purposes
type Task = {
  id: number;
  description: string;
  date: string; // ISO string
  hour: string; // e.g., '14:00'
  completed: boolean;
};

type Deal = {
  id: number;
  amount: number;
  status: "deal" | "cancelled" | "pending";
  closingDate: string; // ISO string
  type: string;
  attachments: string[]; // URLs or names
  completed: boolean;
};

type EmployeeDetailData = {
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
  tasks: Task[];
  deals: Deal[];
};

const dummyEmployeesDetail: EmployeeDetailData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Manager",
    email: "alice@example.com",
    phone: "+1-555-1234",
    revenue: 120000,
    status: "full-time",
    createdAt: "2023-01-15T09:00:00Z",
    tasks: [
      {
        id: 101,
        description: "Prepare quarterly report",
        date: "2024-07-10",
        hour: "10:00",
        completed: true
      },
      {
        id: 102,
        description: "Team meeting",
        date: "2024-07-12",
        hour: "14:00",
        completed: false
      }
    ],
    deals: [
      {
        id: 201,
        amount: 5000,
        status: "deal",
        closingDate: "2024-08-01",
        type: "Contract Renewal",
        attachments: ["contract.pdf"],
        completed: true
      },
      {
        id: 202,
        amount: 12000,
        status: "pending",
        closingDate: "2024-09-15",
        type: "New Client Acquisition",
        attachments: [],
        completed: false
      }
    ]
  },
  // Additional employees can be added here
];

export default function EmployeeDetail() {
  const { id } = useParams();
  const employeeId = Number(id);
  const employee = dummyEmployeesDetail.find((e) => e.id === employeeId);

  if (!employee) {
    return <div className="p-6">Employee not found.</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">{employee.name}</h2>
        <p className="text-muted-foreground mt-1">{employee.role}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Joined on {new Date(employee.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* About & Tasks column */}
        <div className="space-y-6">
          {/* About section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Email:</strong> {employee.email}
              </li>
              <li>
                <strong>Phone:</strong> {employee.phone}
              </li>
              <li>
                <strong>Revenue:</strong> ${employee.revenue.toLocaleString()}
              </li>
              <li>
                <strong>Status:</strong> {employee.status}
              </li>
            </ul>
          </section>

          {/* Tasks section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">Tasks</h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/90"
              >
                <PlusCircle size={16} />
                Add Task
              </button>
            </div>

            {employee.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks assigned.
              </p>
            ) : (
              <ul className="space-y-2">
                {employee.tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between p-3 bg-background rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      {t.completed ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : (
                        <XCircle size={18} className="text-red-600" />
                      )}
                      <span>{t.description}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {t.date} @ {t.hour}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Deals column */}
        <div className="space-y-6">
          {/* Deals section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Deals</h3>

            {employee.deals.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No deals recorded.
              </p>
            ) : (
              <ul className="space-y-2">
                {employee.deals.map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-col p-3 bg-background rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {d.completed ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : (
                        <XCircle size={18} className="text-red-600" />
                      )}
                      <span className="font-medium">{d.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Amount: ${d.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {d.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Closing date:{" "}
                      {new Date(d.closingDate).toLocaleDateString()}
                    </p>
                    {d.attachments.length > 0 && (
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText size={16} />
                        Attachments: {d.attachments.join(", ")}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}