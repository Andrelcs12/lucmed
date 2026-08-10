"use client";

import { Badge } from "@lucmed/ui/components/badge";
import { Button } from "@lucmed/ui/components/button";
import { Input } from "@lucmed/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@lucmed/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@lucmed/ui/components/table";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EmptyBlock,
  ErrorBlock,
  LoadingBlock,
} from "@/components/ux/state-block";
import { routes } from "@/constants/routes";
import { patientsService } from "@/services/patients/patients.service";
import type { Patient } from "@/types/patient";
import { formatDate } from "@/utils/format";

const PAGE_SIZE = 5;

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [sort, setSort] = useState<"name" | "lastAppointment">("name");
  const [page, setPage] = useState(1);

  async function load(nextQuery = query, nextStatus = status, nextSort = sort) {
    setLoading(true);
    setError(null);
    try {
      const result = await patientsService.list({
        query: nextQuery,
        status: nextStatus,
        sort: nextSort,
      });
      setPatients(result);
      setPage(1);
    } catch {
      setError("Não foi possível carregar os pacientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    setLoading(true);
    void patientsService
      .list()
      .then((result) => {
        if (active) setPatients(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os pacientes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(patients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = patients.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
          Lista mock de desenvolvimento.
        </p>
        <Button asChild>
          <Link href={routes.patientsNew}>
            <Plus className="size-4" />
            Novo paciente
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_160px_180px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar por nome, documento, e-mail..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar pacientes"
          />
        </div>
        <Select
          value={status}
          onValueChange={(value: "all" | "active" | "inactive") =>
            setStatus(value)
          }
        >
          <SelectTrigger aria-label="Filtrar status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sort}
          onValueChange={(value: "name" | "lastAppointment") => setSort(value)}
        >
          <SelectTrigger aria-label="Ordenar">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="lastAppointment">Última consulta</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => void load(query, status, sort)}
        >
          Filtrar
        </Button>
      </div>

      {loading ? <LoadingBlock /> : null}

      {error ? (
        <ErrorBlock message={error} onRetry={() => void load()} />
      ) : null}

      {!loading && !error && patients.length === 0 ? (
        <EmptyBlock
          title="Nenhum paciente encontrado"
          description="Você ainda não possui pacientes cadastrados ou nenhum resultado corresponde aos filtros."
          action={
            <Button asChild>
              <Link href={routes.patientsNew}>Cadastrar paciente</Link>
            </Button>
          }
        />
      ) : null}

      {!loading && !error && patients.length > 0 ? (
        <>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[720px] rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Última consulta</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Link
                          href={routes.patient(patient.id)}
                          className="font-medium text-primary hover:underline"
                        >
                          {patient.name}
                        </Link>
                      </TableCell>
                      <TableCell>{patient.document}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>
                        {patient.lastAppointmentAt
                          ? formatDate(patient.lastAppointmentAt)
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            patient.status === "active" ? "default" : "outline"
                          }
                        >
                          {patient.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages} · {patients.length} pacientes
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => value - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((value) => value + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
