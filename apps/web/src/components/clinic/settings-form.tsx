"use client";

import { Button } from "@lucmed/ui/components/button";
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { clinicService } from "@/services/clinic/clinic.service";
import type { Clinic } from "@/types/clinic";

type SaveState = "idle" | "saving" | "saved" | "error";

export function SettingsForm() {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    let active = true;
    void clinicService
      .getClinic()
      .then((result) => {
        if (active) setClinic(result);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    if (!clinic) return;
    setSaveState("saving");
    try {
      const saved = await clinicService.saveClinic(clinic);
      setClinic(saved);
      setSaveState("saved");
      toast.success("Configurações salvas (mock).");
      setTimeout(() => setSaveState("idle"), 1500);
    } catch {
      setSaveState("error");
      toast.error("Não foi possível salvar. Tente novamente.");
    }
  }

  if (loading || !clinic) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
        Persistência mock/local para desenvolvimento.
      </p>

      <Tabs defaultValue="geral">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="endereco">Endereço</TabsTrigger>
          <TabsTrigger value="horarios">Horários</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="preferencias">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent
          value="geral"
          className="mt-4 space-y-4 rounded-xl border border-border bg-card p-5"
        >
          <Field label="Nome" htmlFor="name">
            <Input
              id="name"
              value={clinic.name}
              onChange={(event) =>
                setClinic({ ...clinic, name: event.target.value })
              }
            />
          </Field>
          <Field label="Documento" htmlFor="document">
            <Input
              id="document"
              value={clinic.document}
              onChange={(event) =>
                setClinic({ ...clinic, document: event.target.value })
              }
            />
          </Field>
          <Field label="Telefone" htmlFor="phone">
            <Input
              id="phone"
              value={clinic.phone}
              onChange={(event) =>
                setClinic({ ...clinic, phone: event.target.value })
              }
            />
          </Field>
          <Field label="E-mail" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={clinic.email}
              onChange={(event) =>
                setClinic({ ...clinic, email: event.target.value })
              }
            />
          </Field>
        </TabsContent>

        <TabsContent
          value="endereco"
          className="mt-4 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2"
        >
          <Field label="CEP" htmlFor="zip">
            <Input
              id="zip"
              value={clinic.address.zip}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: { ...clinic.address, zip: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Número" htmlFor="number">
            <Input
              id="number"
              value={clinic.address.number}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: { ...clinic.address, number: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Rua" htmlFor="street" className="sm:col-span-2">
            <Input
              id="street"
              value={clinic.address.street}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: { ...clinic.address, street: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Bairro" htmlFor="neighborhood">
            <Input
              id="neighborhood"
              value={clinic.address.neighborhood}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: {
                    ...clinic.address,
                    neighborhood: event.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input
              id="city"
              value={clinic.address.city}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: { ...clinic.address, city: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Estado" htmlFor="state">
            <Input
              id="state"
              value={clinic.address.state}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: { ...clinic.address, state: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Complemento" htmlFor="complement">
            <Input
              id="complement"
              value={clinic.address.complement}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  address: {
                    ...clinic.address,
                    complement: event.target.value,
                  },
                })
              }
            />
          </Field>
        </TabsContent>

        <TabsContent
          value="horarios"
          className="mt-4 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2"
        >
          <Field label="Início" htmlFor="start">
            <Input
              id="start"
              type="time"
              value={clinic.hours.startTime}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  hours: { ...clinic.hours, startTime: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Fim" htmlFor="end">
            <Input
              id="end"
              type="time"
              value={clinic.hours.endTime}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  hours: { ...clinic.hours, endTime: event.target.value },
                })
              }
            />
          </Field>
          <Field label="Dias" htmlFor="days" className="sm:col-span-2">
            <Input
              id="days"
              value={clinic.hours.days.join(", ")}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  hours: {
                    ...clinic.hours,
                    days: event.target.value
                      .split(",")
                      .map((day) => day.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </Field>
        </TabsContent>

        <TabsContent
          value="perfil"
          className="mt-4 space-y-4 rounded-xl border border-border bg-card p-5"
        >
          <Field label="Logo (URL)" htmlFor="logo">
            <Input
              id="logo"
              placeholder="https://..."
              value={clinic.logo ?? ""}
              onChange={(event) =>
                setClinic({ ...clinic, logo: event.target.value })
              }
            />
          </Field>
          <Field label="Nome público" htmlFor="public-name">
            <Input
              id="public-name"
              value={clinic.name}
              onChange={(event) =>
                setClinic({ ...clinic, name: event.target.value })
              }
            />
          </Field>
          <Field label="Informações públicas" htmlFor="public-info">
            <Textarea
              id="public-info"
              value={clinic.publicInfo ?? ""}
              onChange={(event) =>
                setClinic({ ...clinic, publicInfo: event.target.value })
              }
            />
          </Field>
        </TabsContent>

        <TabsContent
          value="preferencias"
          className="mt-4 space-y-4 rounded-xl border border-border bg-card p-5"
        >
          <Field label="Duração padrão das consultas (min)" htmlFor="duration">
            <Input
              id="duration"
              type="number"
              min={10}
              step={5}
              value={clinic.hours.defaultDurationMinutes}
              onChange={(event) =>
                setClinic({
                  ...clinic,
                  hours: {
                    ...clinic.hours,
                    defaultDurationMinutes: Number(event.target.value) || 30,
                  },
                })
              }
            />
          </Field>
          <p className="text-sm text-muted-foreground">
            Preferências gerais da clínica. Outras opções serão adicionadas com
            o backend.
          </p>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={save} disabled={saveState === "saving"}>
          {saveState === "saving" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar alterações"
          )}
        </Button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {saveState === "saved"
            ? "Salvo"
            : saveState === "error"
              ? "Erro ao salvar"
              : null}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
