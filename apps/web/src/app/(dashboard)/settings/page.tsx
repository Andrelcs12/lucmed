import type { Metadata } from "next";
import { SettingsForm } from "@/components/clinic/settings-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Configurações",
};

export default function SettingsPage() {
  return (
    <DashboardShell title="Configurações">
      <SettingsForm />
    </DashboardShell>
  );
}
