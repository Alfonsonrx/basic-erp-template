export interface Appointment {
    id: number;
    title: string;
    start: string; // e.g., '2024-06-20T22:51:20.801Z'
    end: string; // e.g., '2024-06-20T22:51:20.801Z'
}

export interface basicSchedule {
    today: Appointment[];
    tomorrow: Appointment[];
}
