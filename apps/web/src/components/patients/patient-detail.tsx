"use client";

import { Badge } from "@lucmed/ui/components/badge";
import { Button } from "@lucmed/ui/components/button";
import { Skeleton } from "@lucmed/ui/components/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorBlock } from "@/components/ux/state-block";
import { routes } from "@/constants/routes";
import { patientsService } from "@/services/patients/patients.service";
import type { Patient } from "@/types/patient";
import { formatDate } from "@/utils/format";

export function PatientDetail({ id }: { id: string }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    setError(null);
    void patientsService
      .getById(id)
      .then((result) => {
        if (!result) {
          setError("Paciente não encontrado.");
          setPatient(null);
          return;
        }
        setPatient(result);
      })
      .catch(() => setError("Não foi possível carregar o paciente."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let active = true;
    setLoading(true);
    void patientsService
      .getById(id)
      .then((result) => {
        if (!active) return;
        if (!result) {
          setError("Paciente não encontrado.");
          return;
        }
        setPatient(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar o paciente.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={routes.patients}>
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </Button>
        <ErrorBlock message={error ?? "Erro"} onRetry={load} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href={routes.patients}>
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </Button>
        <Badge variant={patient.status === "active" ? "default" : "outline"}>
          {patient.status === "active" ? "Ativo" : "Inativo"}
        </Badge>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-xl font-semibold tracking-tight">{patient.name}</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <Item label="Documento" value={patient.document} />
          <Item label="Telefone" value={patient.phone || "—"} />
          <Item label="E-mail" value={patient.email || "—"} />
          <Item
            label="Última consulta"
            value={
              patient.lastAppointmentAt
                ? formatDate(patient.lastAppointmentAt)
                : "—"
            }
          />
          <Item
            label="Nascimento"
            value={patient.birthDate ? formatDate(patient.birthDate) : "—"}
          />
        </dl>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold">Informações principais</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {patient.notes || "Nenhuma observação registrada."}
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold">Histórico / consultas</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Histórico detalhado será conectado ao backend. Por enquanto, a última
          consulta conhecida é{" "}
          {patient.lastAppointmentAt
            ? formatDate(patient.lastAppointmentAt)
            : "inexistente"}
          .
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href={routes.schedule}>Ver agenda</Link>
        </Button>
      </section>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  );
}
