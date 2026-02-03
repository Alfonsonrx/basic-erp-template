import {
  createEvent,
  createDayView,
  createWeekView,
  useCalendarApp,
  ViewType,
  type Event,
  createMonthView,
  DayFlowCalendar,
} from "@dayflow/core";
import type { Appointment, RootState } from "@types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const views = ["day", "week", "month"] as const;

type ViewMode = (typeof views)[number];

type Props = {
  appointments: Appointment[];
  className?: string;
  defaultView?: ViewType;
  views?: ViewMode[];
};

function CalendarComponent({
  appointments,
  className,
  defaultView = ViewType.DAY,
  views = ["day", "month"],
}: Props) {
  const { mode } = useSelector((state: RootState) => state.theme);
  // const [events, setEvents] = useState<Event[]>([]);
  const calendarRef = useRef<ReturnType<typeof useCalendarApp> | null>(null);

  const viewCreators = {
    day: createDayView,
    week: createWeekView,
    month: createMonthView,
  };

  const calendar = useCalendarApp({
    views: views.map((v) => viewCreators[v]()),
    events: [],
    defaultView: defaultView,
    initialDate: new Date(),
    theme: { mode: mode },
  });

  useEffect(() => {
    calendarRef.current = calendar;
  }, [calendar]);

  useEffect(() => {
    const calRef = calendarRef.current;
    if (!calRef) return;

    const existing = calRef.getAllEvents?.() || [];
    existing.forEach((e: Event) => {
      calRef.deleteEvent?.(e.id);
    });
    appointments.forEach((app) => {
      const event = createEvent({
        id: app.id.toString(),
        title: app.title,
        start: new Date(app.start),
        end: new Date(app.end),
      });

      if (calRef) {
        calRef.addEvent(event);
      }
    });
  }, [appointments]);


  return (
    <div className={`dayflow-calendar ${className}`}>
      <DayFlowCalendar
        calendar={calendar}
        // customEventDetailDialog={CustomDialogTest}
      />
    </div>
  );
}

export default CalendarComponent;
