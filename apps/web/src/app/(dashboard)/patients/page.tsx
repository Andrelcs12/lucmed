import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PatientsList } from "@/components/patients/patients-list";

export const metadata: Metadata = {
  title: "Pacientes",
};

export default function PatientsPage() {
  return (
    <DashboardShell title="Pacientes">
      <PatientsList />
    </DashboardShell>
  );
}
