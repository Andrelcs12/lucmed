"use client";

import { Badge } from "@lucmed/ui/components/badge";
import { Button } from "@lucmed/ui/components/button";
import { Calendar } from "@lucmed/ui/components/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lucmed/ui/components/dialog";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { Skeleton } from "@lucmed/ui/components/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@lucmed/ui/components/tabs";
import { Textarea } from "@lucmed/ui/components/textarea";
import { AlertCircle, Plus, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { scheduleService } from "@/services/schedule/schedule.service";
import type { Appointment } from "@/types/appointment";
import { formatTime } from "@/utils/format";

function sameDay(iso: string, date: Date) {
  const value = new Date(iso);
  return (
    value.getFullYear() === date.getFullYear() &&
    value.getMonth() === date.getMonth() &&
    value.getDate() === date.getDate()
  );
}

function startOfWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function ScheduleView() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2026-08-10"),
  );
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    date: "2026-08-10",
    time: "15:00",
    durationMinutes: 30,
    notes: "",
  });

  function load() {
    setLoading(true);
    setError(null);
    void scheduleService
      .list()
      .then(setAppointments)
      .catch(() => setError("Não foi possível carregar a agenda."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let active = true;
    setLoading(true);
    void scheduleService
      .list()
      .then((result) => {
        if (active) setAppointments(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar a agenda.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const dayAppointments = useMemo(
    () => appointments.filter((item) => sameDay(item.startsAt, selectedDate)),
    [appointments, selectedDate],
  );

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [selectedDate]);

  async function createAppointment() {
    if (!form.patientName.trim()) {
      toast.error("Informe o nome do paciente.");
      return;
    }

    setSaving(true);
    try {
      const startsAt = `${form.date}T${form.time}:00`;
      await scheduleService.create({
        patientId: "pat_new",
        patientName: form.patientName.trim(),
        startsAt,
        durationMinutes: Number(form.durationMinutes) || 30,
        notes: form.notes.trim() || undefined,
      });
      toast.success("Consulta criada (mock).");
      setOpen(false);
      setForm({
        patientName: "",
        date: form.date,
        time: "15:00",
        durationMinutes: 30,
        notes: "",
      });
      load();
    } catch {
      toast.error("Falha ao criar consulta.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
          Agenda com dados mock de desenvolvimento.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Nova consulta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova consulta</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Paciente</Label>
                <Input
                  id="patientName"
                  value={form.patientName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      patientName: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        time: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duração (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={10}
                  step={5}
                  value={form.durationMinutes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      durationMinutes: Number(event.target.value) || 30,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => void createAppointment()}
                disabled={saving}
              >
                {saving ? "Salvando..." : "Agendar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      ) : null}

      {error ? (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="size-4" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="rounded-xl border border-border bg-card p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="mx-auto"
            />
          </div>

          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Visão diária</TabsTrigger>
              <TabsTrigger value="week">Visão semanal</TabsTrigger>
            </TabsList>

            <TabsContent value="day" className="mt-4 space-y-3">
              {dayAppointments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
                  <p className="font-medium">Nenhuma consulta neste dia</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Horários livres para atendimento.
                  </p>
                </div>
              ) : (
                dayAppointments.map((item) => (
                  <AppointmentCard key={item.id} appointment={item} />
                ))
              )}
            </TabsContent>

            <TabsContent
              value="week"
              className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
            >
              {weekDays.map((day) => {
                const items = appointments.filter((item) =>
                  sameDay(item.startsAt, day),
                );
                return (
                  <div
                    key={day.toISOString()}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-sm font-semibold">
                      {day.toLocaleDateString("pt-BR", {
                        weekday: "short",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {items.length === 0 ? (
                        <li className="text-xs text-muted-foreground">
                          Disponível
                        </li>
                      ) : (
                        items.map((item) => (
                          <li
                            key={item.id}
                            className="rounded-lg bg-muted/70 px-2 py-1.5 text-xs"
                          >
                            <span className="font-medium">
                              {formatTime(item.startsAt)}
                            </span>{" "}
                            · {item.patientName}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <article className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <div>
        <p className="font-medium">{appointment.patientName}</p>
        <p className="text-sm text-muted-foreground">
          {formatTime(appointment.startsAt)} · {appointment.durationMinutes} min
          {appointment.notes ? ` · ${appointment.notes}` : ""}
        </p>
      </div>
      <Badge
        variant={appointment.status === "confirmed" ? "default" : "secondary"}
      >
        {appointment.status === "confirmed" ? "Confirmada" : "Agendada"}
      </Badge>
    </article>
  );
}
