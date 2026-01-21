import { Card } from "@/components/Card";
import { tasks, projects } from "@/dummyData/projects";
import { appointments } from "@/dummyData/appointments";

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const tasksToday = tasks.filter((t) => t.date.startsWith(today));
  // For the demo we don't need tomorrow tasks separately

  // Projects where the profile is linked – for demo, all projects
  const userProjects = projects;

  // Gamification metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status == "done").length;
  const projectProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const appointmentsCommitted =
    appointments.today.length + appointments.tomorrow.length;

  // Determine max rows for table
  const maxRows = Math.max(
    appointments.today.length,
    appointments.tomorrow.length,
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Welcome back!</h1>
      <div className="flex gap-6 flex-wrap ">
        {/* <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
        <div className="flex flex-col grow gap-4">
          {/* Objectives */}
          <Card classname="bg-card" title="Objectives">
            <p>
              Tasks completed today:{" "}
              {tasksToday.filter((t) => t.status == "done").length}
            </p>
            <p>Project progress: {projectProgress}%</p>
            <p>Appointments committed: {appointmentsCommitted}</p>
          </Card>

          {/* Task of the profile used */}
          <Card classname="bg-card" title="Tasks Today">
            <h2 className="text-sm">
              {tasksToday.length} tasks assigned for today.
            </h2>
          </Card>

          {/* Projects where the profile is linked */}
          <div className="p-0">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-2">
              {userProjects.map((p) => (
                <Card key={p.id} title={p.name} classname="bg-card">
                  <h2>{p.status}</h2>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments of the profile that day and next */}
        <Card classname="bg-card w-full lg:w-4/12" title="Appointments">
          <table className="w-full border-collapse ">
            <thead>
              <tr>
                <th className="text-left px-2 py-1 font-medium">Today</th>
                <th className="text-left px-2 py-1 font-medium">Tomorrow</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, idx) => (
                <tr key={idx}>
                  <td className="border-t px-2 py-1">
                    {appointments.today[idx]
                      ? `${appointments.today[idx].title} (${appointments.today[idx].time})`
                      : ""}
                  </td>
                  <td className="border-t px-2 py-1">
                    {appointments.tomorrow[idx]
                      ? `${appointments.tomorrow[idx].title} (${appointments.tomorrow[idx].time})`
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default Home;
