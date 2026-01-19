import type { TaskItem } from "@/dummyData/projects";
import { IconButton } from "@components/IconButton";
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";

type Props = {
  initialTasks: TaskItem[];
};

function TaskTable({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (
    id: number,
    field: keyof Omit<TaskItem, "id">,
    value: string,
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, [field]: typeof field === "string" ? value : Number(value) }
          : t,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setTasks(tasks.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <Fragment>
      <table className="min-w-full border-collapse rounded-md shadow-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wider text-foreground">
            <th className="px-2 py-2 hidden md:table-cell">Status</th>
            <th className="px-2 py-2 ">Description</th>
            <th className="px-2 py-2 hidden lg:table-cell">Date</th>
            <th className="px-2 py-2 hidden lg:table-cell">Project</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-b py-0.5 ">
              <td className="px-2 py-2 hidden sm:table-cell">
                {editingId === t.id ? (
                  <select
                    name="status"
                    value={t.status}
                    onChange={(e) =>
                      handleChange(t.id, "status", e.target.value)
                    }
                  >
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                ) : (
                  t.status
                )}
              </td>
              <td className="px-2 py-2">
                {editingId === t.id ? (
                  <input
                    type="text"
                    value={t.title}
                    onChange={(e) =>
                      handleChange(t.id, "title", e.target.value)
                    }
                    className="w-full border rounded px-1 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                ) : (
                  <p className="truncate">{t.title}</p>
                )}
              </td>
              <td className="px-2 py-2 hidden lg:table-cell">
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
              <td className="px-2 py-2 hidden lg:table-cell">
                {t.project ? t.project.name : "None"}
              </td>

              <td className="px-2 py-2 items-center gap-2 hidden sm:flex justify-end">
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
