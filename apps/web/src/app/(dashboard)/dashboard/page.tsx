import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <DashboardView />
    </DashboardShell>
  );
}
