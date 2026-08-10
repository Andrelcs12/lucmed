import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PatientDetail } from "@/components/patients/patient-detail";

export const metadata: Metadata = {
  title: "Paciente",
};

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DashboardShell title="Paciente">
      <PatientDetail id={id} />
    </DashboardShell>
  );
}
