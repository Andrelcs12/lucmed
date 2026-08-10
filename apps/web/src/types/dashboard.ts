import type { Appointment } from "./appointment";
import type { Patient } from "./patient";

export type DashboardStats = {
  appointmentsToday: number;
  upcomingCount: number;
  patientsTotal: number;
  revenueMonth: number;
};

export type DashboardActivity = {
  id: string;
  label: string;
  at: string;
};

export type DashboardData = {
  stats: DashboardStats;
  upcoming: Appointment[];
  recentPatients: Patient[];
  activity: DashboardActivity[];
  chart: { label: string; value: number }[];
};
