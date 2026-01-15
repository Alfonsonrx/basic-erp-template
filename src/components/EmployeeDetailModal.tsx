"use client";

import { useEffect } from "react";
import { Modal } from "./Modal";
import {
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  FileText,
  PlusCircle
} from "lucide-react";

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

export interface EmployeeDetailProps {
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
}

type Props = {
  open: boolean;
  onClose: () => void;
  employee?: EmployeeDetailProps | null;
};

export const EmployeeDetailModal: React.FC<Props> = ({
  open,
  onClose,
  employee
}) => {
  // If no employee data, just show an empty modal (or nothing)
  if (!employee) return <Modal open={open} onClose={onClose} />;

  const {
    name,
    role,
    email,
    phone,
    revenue,
    status,
    createdAt,
    tasks,
    deals
  } = {
  "name": "Jane Doe",
  "role": "Senior Product Manager",
  "email": "jane.doe@example.com",
  "phone": "+1‑555‑987‑6543",
  "revenue": 275000,
  "status": "full-time",
  "createdAt": "2022-04-12T09:30:00Z",
  "tasks": [
    {
      "id": 101,
      "description": "Finalize Q3 roadmap",
      "date": "2024‑08‑01",
      "hour": "10:00",
      "completed": true
    },
    {
      "id": 102,
      "description": "Client demo for new feature",
      "date": "2024‑08‑05",
      "hour": "14:30",
      "completed": false
    }
  ],
  "deals": [
    {
      "id": 201,
      "amount": 12000,
      "status": "deal",
      "closingDate": "2024‑09‑15",
      "type": "Enterprise Subscription",
      "attachments": ["contract.pdf"],
      "completed": true
    },
    {
      "id": 202,
      "amount": 8000,
      "status": "pending",
      "closingDate": "2024‑10‑01",
      "type": "Add‑on Package",
      "attachments": [],
      "completed": false
    }
  ]
};

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-primary">{name}</h2>
          <p className="text-muted-foreground mt-1">{role}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Joined on {new Date(createdAt).toLocaleDateString()}
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

              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tasks assigned.
                </p>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((t) => (
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

              {deals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No deals recorded.
                </p>
              ) : (
                <ul className="space-y-2">
                  {deals.map((d) => (
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
    </Modal>
  );
};