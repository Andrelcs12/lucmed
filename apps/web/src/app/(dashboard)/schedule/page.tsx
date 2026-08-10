import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ScheduleView } from "@/components/schedule/schedule-view";

export const metadata: Metadata = {
  title: "Agenda",
};

export default function SchedulePage() {
  return (
    <DashboardShell title="Agenda">
      <ScheduleView />
    </DashboardShell>
  );
}
