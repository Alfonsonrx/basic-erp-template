import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { TeammateDetailData } from "@types";
import { dummyProrile } from "@/dummyData/projects";

export default function ProfilePage() {
  // For demo we use the first teammate as the logged‑in user
  const initial = dummyProrile as TeammateDetailData;
  const [user, setUser] = useState<TeammateDetailData>({ ...initial });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    // In a real app this would hit an API; here we just keep local state
    setEditMode(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">{user.name}</h2>
        <p className="text-muted-foreground mt-1">{user.role}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Edit button */}
      <button
        type="button"
        className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/90 mb-4"
        onClick={() => setEditMode((m) => !m)}
      >
        {editMode ? "Cancel" : "Edit Profile"}
      </button>

      {/* About section */}
      <section className="space-y-2 text-sm">
        <h3 className="text-xl font-semibold mb-4">About</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>Email:</strong>{' '}
            {editMode ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              user.email
            )}
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              user.phone
            )}
          </li>
          <li>
            <strong>Revenue:</strong>{' '}
            {editMode ? (
              <input
                type="number"
                name="revenue"
                value={user.revenue}
                onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value } }) as any}
                className="border rounded px-2 py-1"
              />
            ) : (
              `$${user.revenue.toLocaleString()}`
            )}
          </li>
          <li>
            <strong>Status:</strong>{' '}
            {editMode ? (
              <input
                type="text"
                name="status"
                value={user.status}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              user.status
            )}
          </li>
        </ul>
      </section>

      {/* Summary section */}
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card rounded-md shadow-sm">
            <h4 className="font-medium">Tasks Assigned</h4>
            <p>{user.tasks.length}</p>
          </div>
        </div>
      </section>

      {/* Tasks list */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">Tasks</h3>
          <button type="button" className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-md hover:bg-primary/90">
            <PlusCircle size={16} /> Add Task
          </button>
        </div>
        {user.tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks assigned.</p>
        ) : (
          <ul className="space-y-2">
            {user.tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between p-3 bg-card rounded-md shadow-sm">
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

      {/* Save button if in edit mode */}
      {editMode && (
        <button type="button" onClick={saveChanges} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
          Save Changes
        </button>
      )}
    </div>
  );
}
