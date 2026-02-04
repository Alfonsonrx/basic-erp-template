import {
  useCalendarApp,
  DayFlowCalendar,
  createDayView,
  createWeekView,
  createMonthView,
  createDragPlugin,
  createEvent,
  ViewType,
} from "@dayflow/core";
import "@styles/style.css";
import AppointmentModal from "./AppointmentModal";
import { calendarAppointments } from "@/dummyData/appointments";
import { useSelector } from "react-redux";
import type { RootState } from "@types";
import { Calendar, Plus } from "lucide-react";
import { PrimaryButton } from "@components/Buttons";

type Props = {};

function Appointments({}: Props) {
  const dragPlugin = createDragPlugin();
  const { mode } = useSelector((state: RootState) => state.theme);

  const events = calendarAppointments.map((appointment) =>
    createEvent({
      id: appointment.id.toString(),
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
    })
  );

  const calendar = useCalendarApp({
    views: [createDayView(), createWeekView(), createMonthView()],
    plugins: [dragPlugin],
    events,
    defaultView: ViewType.MONTH,
    initialDate: new Date(),
    theme: { mode: mode },
  });

  return (
    <div className="dayflow-calendar p-6 h-full flex flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
        </div>
        <PrimaryButton
          onClick={() => {
            // TODO: Add create appointment functionality
            console.log("Create new appointment");
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Appointment
        </PrimaryButton>
      </div>

      {/* Calendar Container */}
      <div className="flex-1 rounded-lg bg-card border border-border shadow overflow-hidden">
          <DayFlowCalendar
            calendar={calendar}
            customEventDetailDialog={AppointmentModal}
          />
      </div>
    </div>
  );
}

export default Appointments;
