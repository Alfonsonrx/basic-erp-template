import type { Appointment, basicSchedule } from "@types";

export const appointments: basicSchedule = {
    today: [
        { id: 1, title: "Team Standup", start: `2026-01-22T09:00`, end: `2026-01-22T21:00` },
        { id: 2, title: "Client Call", start: `2026-01-22T14:30`, end: `2026-01-22T21:00` },
        { id: 3, title: "Project Review", start: `2026-01-22T11:00`, end: `2026-01-22T21:00` }
    ],
    tomorrow: [
        { id: 12, title: "Team Standup", start: `2026-01-22T09:00`, end: `2026-01-22T21:00` },
        { id: 21, title: "Client Call", start: `2026-01-22T14:30`, end: `2026-01-22T21:00` },
        { id: 31, title: "Project Review", start: `2026-01-22T11:00`, end: `2026-01-22T21:00` }
    ]
};

export const calendarAppointments: Appointment[] = [
    { id: 1, title: "Team Standup", start: `2026-02-12T09:00`, end: `2026-02-12T21:00` },
    { id: 2, title: "Client Call", start: `2026-02-02T14:30`, end: `2026-02-02T21:00` },
    { id: 3, title: "Project Review", start: `2026-02-12T11:00`, end: `2026-02-12T21:00` },
    { id: 12, title: "Team Standup", start: `2026-02-12T09:00`, end: `2026-02-12T21:00` },
    { id: 21, title: "Client Call", start: `2026-02-12T14:30`, end: `2026-02-12T21:00` },
    { id: 31, title: "Project Review", start: `2026-02-12T11:00`, end: `2026-02-12T21:00` }
];