export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  startsAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
  notes?: string;
};
