import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PatientForm } from "@/components/patients/patient-form";

export const metadata: Metadata = {
  title: "Novo paciente",
};

export default function NewPatientPage() {
  return (
    <DashboardShell title="Novo paciente">
      <PatientForm />
    </DashboardShell>
  );
}
