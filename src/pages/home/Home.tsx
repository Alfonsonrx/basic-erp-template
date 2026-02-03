import { Card } from "@components/ui/Card";
import { tasks, dummyProjects } from "@/dummyData/projects";
import { appointments } from "@/dummyData/appointments";
import CalendarComponent from "@components/calendar/CalendarComponent";
import { calendarAppointments } from "@/dummyData/appointments";
import ProjectMiniCard from "@components/projects/ProjectMiniCard";

function Home() {
  //
  const tasksInProgress = tasks.filter((t) => t.status == "inprogress");

  // Loading Projects (Change later to connect with API)
  const userProjects = dummyProjects;

  // Gamification
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status == "done").length;
  const projectProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const appointmentsCommitted =
    appointments.today.length + appointments.tomorrow.length;

  return (
    <div className="space-y-8 items-center justify-between m-6">
      <h2 className="text-3xl font-bold text-foreground">Welcome back!</h2>
      <div className="gap-6 ">
        <div className="flex flex-wrap gap-4">
          {/* Objectives */}
          <div className="flex flex-wrap md:flex-nowrap grow gap-4">
            <Card classname="md:min-w-64 bg-card w-full" title="Objectives">
              <p>
                Tasks completed:{" "}
                {tasksInProgress.filter((t) => t.status == "done").length}
              </p>
              <p>Project progress: {projectProgress}%</p>
              <p>Appointments committed: {appointmentsCommitted}</p>
            </Card>

            {/* Task of the profile used */}
            <Card classname="md:min-w-64 bg-card w-full" title="Tasks Today">
              <h2 className="text-sm">
                {tasksInProgress.length} tasks assigned for today.
              </h2>
            </Card>
          </div>

          {/* Projects where the profile is linked */}
          <div className="grow p-0 md:min-w-lg">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-2">
              {userProjects.map((p) => (
                <ProjectMiniCard project={p} />
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
