import { Button } from "@lucmed/ui/components/button";
import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Atendimentos",
};

export default function AppointmentsPage() {
  return (
    <DashboardShell title="Atendimentos">
      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <h2 className="text-lg font-semibold">Atendimentos do dia</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Acompanhe a fila de atendimento pela agenda. Esta área será expandida
          com o backend.
        </p>
        <Button asChild className="mt-6">
          <Link href={routes.schedule}>Abrir agenda</Link>
        </Button>
      </div>
    </DashboardShell>
  );
}
