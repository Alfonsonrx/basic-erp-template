"use client";

const dummyEmployees = [
  { id: 1, name: 'Alice Johnson', role: 'Manager' },
  { id: 2, name: 'Bob Smith', role: 'Developer' },
  { id: 3, name: 'Carol Lee', role: 'Designer' }
];

function Employees() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Employees</h2>
      <ul className="border rounded-md p-4 space-y-2 bg-background text-foreground">
        {dummyEmployees.map((emp) => (
          <li key={emp.id} className="flex justify-between items-center">
            <span>{emp.name}</span>
            <span className="text-muted-foreground">{emp.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;