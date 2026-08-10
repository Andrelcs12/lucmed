import type { DashboardData } from "@/types/dashboard";

export async function mockGetDashboard(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    stats: {
      appointmentsToday: 12,
      upcomingCount: 5,
      patientsTotal: 248,
      revenueMonth: 18450,
    },
    upcoming: [
      {
        id: "apt_1",
        patientId: "pat_1",
        patientName: "Ana Souza",
        startsAt: "2026-08-10T09:00:00",
        durationMinutes: 30,
        status: "confirmed",
      },
      {
        id: "apt_2",
        patientId: "pat_2",
        patientName: "Carlos Lima",
        startsAt: "2026-08-10T10:30:00",
        durationMinutes: 45,
        status: "scheduled",
      },
      {
        id: "apt_3",
        patientId: "pat_3",
        patientName: "Marina Dias",
        startsAt: "2026-08-10T14:00:00",
        durationMinutes: 30,
        status: "confirmed",
      },
    ],
    recentPatients: [
      {
        id: "pat_1",
        name: "Ana Souza",
        document: "123.456.789-00",
        phone: "(11) 90000-1111",
        email: "ana@email.com",
        status: "active",
        lastAppointmentAt: "2026-08-01",
      },
      {
        id: "pat_4",
        name: "Pedro Alves",
        document: "987.654.321-00",
        phone: "(11) 90000-2222",
        email: "pedro@email.com",
        status: "active",
        lastAppointmentAt: "2026-07-28",
      },
      {
        id: "pat_5",
        name: "Julia Rocha",
        document: "111.222.333-44",
        phone: "(11) 90000-3333",
        email: "julia@email.com",
        status: "inactive",
        lastAppointmentAt: "2026-06-12",
      },
    ],
    activity: [
      {
        id: "act_1",
        label: "Consulta confirmada — Ana Souza",
        at: "Há 12 min",
      },
      {
        id: "act_2",
        label: "Novo paciente — Pedro Alves",
        at: "Há 1 h",
      },
      {
        id: "act_3",
        label: "Horário atualizado na agenda",
        at: "Há 2 h",
      },
    ],
    chart: [
      { label: "Seg", value: 8 },
      { label: "Ter", value: 12 },
      { label: "Qua", value: 9 },
      { label: "Qui", value: 14 },
      { label: "Sex", value: 11 },
      { label: "Sáb", value: 4 },
    ],
  };
}
