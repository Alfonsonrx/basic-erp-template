export interface Appointment {
    id: number;
    title: string;
    time: string; // e.g., 'T09:00:00Z'
}

export const appointments = {
    today: [
        { id: 1, title: "Team Standup", time: `09:00` },
        { id: 2, title: "Client Call", time: `14:30` },
        { id: 3, title: "Project Review", time: `11:00` }
    ],
    tomorrow: [
        { id: 12, title: "Team Standup", time: `09:00` },
        { id: 21, title: "Client Call", time: `14:30` },
        { id: 31, title: "Project Review", time: `11:00` }
    ]
};