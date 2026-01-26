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
import CustomDialogTest from "./CustomDialogTest";
import { calendarAppointments } from "@/dummyData/appointments";
import { useSelector } from "react-redux";
import type { RootState } from "@types";

type Props = {};

function CalendarTest({}: Props) {
  const dragPlugin = createDragPlugin();
  const { mode } = useSelector((state: RootState) => state.theme);

  const events = [
    createEvent({
      id: calendarAppointments[0].id.toLocaleString(),
      title: calendarAppointments[0].title,
      start: new Date(calendarAppointments[0].start),
      end: new Date(calendarAppointments[0].end),
    }),
  ];

  const calendar = useCalendarApp({
    views: [createDayView(), createWeekView(), createMonthView()],
    plugins: [dragPlugin],
    events,
    defaultView: ViewType.MONTH,
    initialDate: new Date(),
    theme: { mode: mode },
  });

  return (
    <div className="dayflow-calendar rounded-lg bg-card shadow m-4">
      {/* <h1 className="text-lg font-semibold mb-4">My Calendar</h1> */}
      <div>
        <DayFlowCalendar
          calendar={calendar}
          customEventDetailDialog={CustomDialogTest}
        />
      </div>
    </div>
  );
}

export default CalendarTest;
