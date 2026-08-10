export type PatientStatus = "active" | "inactive";

export type Patient = {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  status: PatientStatus;
  lastAppointmentAt?: string;
  birthDate?: string;
  notes?: string;
};
