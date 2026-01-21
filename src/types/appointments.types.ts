export interface Appointment {
    id: number;
    title: string;
    time: string; // e.g., 'T09:00:00Z'
}

export interface basicSchedule {
    today: Appointment[];
    tomorrow: Appointment[]; // e.g., 'T09:00:00Z'
}
