import type { Appointment } from "@/types/appointment";

let appointments: Appointment[] = [
  {
    id: "apt_1",
    patientId: "pat_1",
    patientName: "Ana Souza",
    startsAt: "2026-08-10T09:00:00",
    durationMinutes: 30,
    status: "confirmed",
    notes: "Retorno",
  },
  {
    id: "apt_2",
    patientId: "pat_2",
    patientName: "Carlos Lima",
    startsAt: "2026-08-10T10:30:00",
    durationMinutes: 45,
    status: "scheduled",
    notes: "Primeira consulta",
  },
  {
    id: "apt_3",
    patientId: "pat_3",
    patientName: "Marina Dias",
    startsAt: "2026-08-10T14:00:00",
    durationMinutes: 30,
    status: "confirmed",
  },
  {
    id: "apt_4",
    patientId: "pat_4",
    patientName: "Pedro Alves",
    startsAt: "2026-08-11T09:30:00",
    durationMinutes: 30,
    status: "scheduled",
  },
  {
    id: "apt_5",
    patientId: "pat_5",
    patientName: "Julia Rocha",
    startsAt: "2026-08-12T11:00:00",
    durationMinutes: 30,
    status: "scheduled",
  },
];

export async function mockListAppointments() {
  await delay(350);
  return [...appointments].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function mockCreateAppointment(
  input: Omit<Appointment, "id" | "status"> & {
    status?: Appointment["status"];
  },
) {
  await delay(500);
  const appointment: Appointment = {
    ...input,
    id: `apt_${Date.now()}`,
    status: input.status ?? "scheduled",
  };
  appointments = [...appointments, appointment];
  return appointment;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
