import { useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import type { TeammateDetailData } from "@types";

const dummyTeammatesDetail: TeammateDetailData[] = [
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
        title: "Prepare quarterly report",
        deadline: "2024-07-10",
        hour: "10:00",
        status: "done",
      },
      {
        id: 102,
        title: "Team meeting",
        deadline: "2024-07-12",
        hour: "14:00",
        status: "done",
      },
    ],
    projects: [
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
    ],
  },
];

export default function TeammateDetail() {
  const { id } = useParams();
  const TeammateId = Number(id);
  const Teammate = dummyTeammatesDetail.find((e) => e.id === TeammateId);

  if (!Teammate) {
    return <div className="p-6">Teammate not found.</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">{Teammate.name}</h2>
        <p className="text-muted-foreground mt-1">{Teammate.role}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Joined on {new Date(Teammate.createdAt).toLocaleDateString()}
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
                <strong>Email:</strong> {Teammate.email}
              </li>
              <li>
                <strong>Phone:</strong> {Teammate.phone}
              </li>
              <li>
                <strong>Revenue:</strong> ${Teammate.revenue.toLocaleString()}
              </li>
              <li>
                <strong>Status:</strong> {Teammate.status}
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

            {Teammate.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks assigned.
              </p>
            ) : (
              <ul className="space-y-2">
                {Teammate.tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between p-3 bg-card rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {t.deadline} @ {t.hour}
                    </span>
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
