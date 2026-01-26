import { Card } from "@/components/Card";
import { tasks, dummyProjects } from "@/dummyData/projects";
import { appointments } from "@/dummyData/appointments";
import CalendarComponent from "@components/CalendarComponent";
import { calendarAppointments } from "@/dummyData/appointments";

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const tasksToday = tasks.filter((t) => t.deadline.startsWith(today));
  // For the demo we don't need tomorrow tasks separately

  // Projects where the profile is linked – for demo, all projects
  const userProjects = dummyProjects;

  // Gamification metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status == "done").length;
  const projectProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const appointmentsCommitted =
    appointments.today.length + appointments.tomorrow.length;

  // Determine max rows for table
  // const maxRows = Math.max(
  //   appointments.today.length,
  //   appointments.tomorrow.length,
  // );

  return (
    <div className="space-y-8 items-center justify-between m-6">
      <h2 className="text-3xl font-bold text-foreground">Welcome back!</h2>
      <div className="gap-6 ">
        {/* <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
        <div className="flex flex-col gap-4">
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
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
          <CalendarComponent appointments={calendarAppointments} />
        </div>
      </div>
    </div>
  );
}

export default Home;
