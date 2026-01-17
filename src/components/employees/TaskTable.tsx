import { IconButton } from "@components/IconButton";
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";

export type Task = {
  id: number;
  description: string;
  date: string; // ISO string
  hour: string; // e.g., '14:00'
  completed: boolean;
  status: "completed" | "cancelled" | "pending";
};

type Props = {
  initialTasks: Task[];
};

function TaskTable({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (
    id: number,
    field: keyof Omit<Task, "id">,
    value: string
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, [field]: typeof field === "string" ? value : Number(value) }
          : t
      )
    );
  };

  // const toggleTaskCompletion = (taskId: number) => {
  //   setTasks((prev) =>
  //     prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
  //   );
  // };

  const deleteProduct = (id: number) => {
    setTasks(tasks.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <Fragment>
      <table className="min-w-full border-collapse rounded-md shadow-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wider text-foreground">
            <th className="px-2 py-2 ">Status</th>
            <th className="px-2 py-2">Description</th>
            <th className="px-2 py-2">Date</th>
            <th className="px-2 py-2">Hour</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-b py-0.5">
              <td className="px-2 py-2">
                {editingId === t.id ? (
                  // <input
                  //   type="text"
                  //   value={t.description}
                  //   onChange={(e) =>
                  //     handleChange(t.id, "description", e.target.value)
                  //   }
                  //   className="w-full border rounded px-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  // />
                  <select
                    name="status"
                    value={t.status}
                    onChange={(e) => handleChange(t.id, "status", e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                ) : (
                  t.status
                )}
              </td>
              <td className="px-2 py-2 w-full">
                {editingId === t.id ? (
                  <input
                    type="text"
                    value={t.description}
                    onChange={(e) =>
                      handleChange(t.id, "description", e.target.value)
                    }
                    className="w-full border rounded px-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  t.description
                )}
              </td>
              <td className="px-2 py-2">
                {editingId === t.id ? (
                  <input
                    type="date"
                    value={t.date}
                    onChange={(e) => handleChange(t.id, "date", e.target.value)}
                    className="w-full border rounded px-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  t.date
                )}
              </td>
              <td className="px-2 py-2">
                {editingId === t.id ? (
                  <input
                    type="time"
                    value={t.hour}
                    onChange={(e) => handleChange(t.id, "hour", e.target.value)}
                    className="w-full border rounded px-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  t.hour
                )}
              </td>

              <td className="px-2 py-2 flex items-center gap-2">
                {/* {editingId === p.id ? (
                ) : null} */}
                <button
                  onClick={() => {
                    setEditingId(editingId ? null : t.id);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <Pencil size={24} />
                </button>
                <button
                  onClick={() => deleteProduct(t.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex justify-between">
        <IconButton className="bg-primary/50" icon={ArrowLeft} />
        <IconButton className="bg-primary/50" icon={ArrowRight} />
      </div>
    </Fragment>
  );
}

export default TaskTable;
