"use client";

import { Badge } from "@lucmed/ui/components/badge";
import { Button } from "@lucmed/ui/components/button";
import { Skeleton } from "@lucmed/ui/components/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/constants/routes";
import { dashboardService } from "@/services/dashboard/dashboard.service";
import type { DashboardData } from "@/types/dashboard";
import { formatCurrency, formatTime } from "@/utils/format";

export function DashboardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    setError(null);
    void dashboardService
      .getDashboard()
      .then((result) => setData(result))
      .catch(() => setError("Não foi possível carregar o dashboard."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    let active = true;

    void dashboardService
      .getDashboard()
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar o dashboard.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {["s1", "s2", "s3", "s4"].map((id) => (
            <Skeleton key={id} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="size-4" />
          <p className="text-sm font-medium">{error ?? "Erro inesperado"}</p>
        </div>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="size-4" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  const maxChart = Math.max(...data.chart.map((item) => item.value), 1);

  return (
    <div className="space-y-6">
      <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
        Dashboard com dados mock de desenvolvimento.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Consultas hoje"
          value={String(data.stats.appointmentsToday)}
        />
        <StatCard
          label="Próximos atendimentos"
          value={String(data.stats.upcomingCount)}
        />
        <StatCard label="Pacientes" value={String(data.stats.patientsTotal)} />
        <StatCard
          label="Faturamento (mês)"
          value={formatCurrency(data.stats.revenueMonth)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Consultas na semana</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {data.chart.map((item) => (
              <div
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-md bg-primary/85 transition-all"
                  style={{ height: `${(item.value / maxChart) * 100}%` }}
                  title={`${item.value} consultas`}
                />
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Próximas consultas</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href={routes.schedule}>Ver agenda</Link>
            </Button>
          </div>
          <ul className="mt-4 space-y-3">
            {data.upcoming.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">{item.patientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(item.startsAt)} · {item.durationMinutes} min
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === "confirmed" ? "default" : "secondary"
                  }
                >
                  {item.status === "confirmed" ? "Confirmada" : "Agendada"}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Pacientes recentes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href={routes.patients}>Ver todos</Link>
            </Button>
          </div>
          <ul className="mt-4 space-y-3">
            {data.recentPatients.map((patient) => (
              <li
                key={patient.id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.email}
                  </p>
                </div>
                <Badge
                  variant={patient.status === "active" ? "default" : "outline"}
                >
                  {patient.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Atividade recente</h2>
          <ul className="mt-4 space-y-3">
            {data.activity.map((item) => (
              <li key={item.id} className="rounded-lg bg-muted/60 px-3 py-2.5">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.at}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
