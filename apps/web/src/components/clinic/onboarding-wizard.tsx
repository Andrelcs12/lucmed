"use client";

import { Button } from "@lucmed/ui/components/button";
import { Checkbox } from "@lucmed/ui/components/checkbox";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { Progress } from "@lucmed/ui/components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@lucmed/ui/components/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { routes } from "@/constants/routes";
import { clinicService } from "@/services/clinic/clinic.service";
import type { OnboardingDraft } from "@/types/clinic";

const STEPS = [
  "Dados da clínica",
  "Endereço",
  "Funcionamento",
  "Resumo",
] as const;

const WEEK_DAYS = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
  { id: "sab", label: "Sáb" },
  { id: "dom", label: "Dom" },
] as const;

const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

const initialDraft: OnboardingDraft = {
  profile: {
    name: "",
    document: "",
    phone: "",
    email: "",
  },
  address: {
    zip: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "SP",
  },
  hours: {
    days: ["seg", "ter", "qua", "qui", "sex"],
    startTime: "08:00",
    endTime: "18:00",
    defaultDurationMinutes: 30,
  },
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function validateStep() {
    if (step === 0) {
      const { name, document, phone, email } = draft.profile;
      if (!name || !document || !phone || !email) {
        return "Preencha todos os dados da clínica.";
      }
    }

    if (step === 1) {
      const { zip, street, number, neighborhood, city, state } = draft.address;
      if (!zip || !street || !number || !neighborhood || !city || !state) {
        return "Preencha o endereço completo.";
      }
    }

    if (step === 2) {
      if (draft.hours.days.length === 0) {
        return "Selecione ao menos um dia de funcionamento.";
      }
      if (!draft.hours.startTime || !draft.hours.endTime) {
        return "Informe o horário de funcionamento.";
      }
    }

    return null;
  }

  function next() {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((value) => Math.min(value + 1, STEPS.length - 1));
  }

  function back() {
    setError(null);
    setStep((value) => Math.max(value - 1, 0));
  }

  async function finish() {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await clinicService.completeOnboarding(draft);
      setDone(true);
      toast.success("Clínica configurada com sucesso.");
      setTimeout(() => router.push(routes.dashboard), 900);
    } catch {
      setError("Não foi possível concluir o onboarding. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function toggleDay(day: string) {
    setDraft((current) => {
      const exists = current.hours.days.includes(day);
      return {
        ...current,
        hours: {
          ...current.hours,
          days: exists
            ? current.hours.days.filter((item) => item !== day)
            : [...current.hours.days, day],
        },
      };
    });
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h2 className="text-xl font-semibold">Tudo pronto!</h2>
        <p className="text-sm text-muted-foreground">
          Redirecionando para o dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="font-medium text-foreground">
            Etapa {step + 1} de {STEPS.length}
          </p>
          <p className="text-muted-foreground">{STEPS[step]}</p>
        </div>
        <Progress value={progress} aria-label="Progresso do onboarding" />
        <ol className="flex flex-wrap gap-2">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                index === step
                  ? "bg-primary text-primary-foreground"
                  : index < step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {step === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome da clínica"
            htmlFor="clinic-name"
            className="sm:col-span-2"
          >
            <Input
              id="clinic-name"
              value={draft.profile.name}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  profile: { ...current.profile, name: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Documento (CNPJ/CPF)" htmlFor="clinic-doc">
            <Input
              id="clinic-doc"
              value={draft.profile.document}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  profile: { ...current.profile, document: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Telefone" htmlFor="clinic-phone">
            <Input
              id="clinic-phone"
              value={draft.profile.phone}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  profile: { ...current.profile, phone: event.target.value },
                }))
              }
            />
          </Field>
          <Field
            label="E-mail"
            htmlFor="clinic-email"
            className="sm:col-span-2"
          >
            <Input
              id="clinic-email"
              type="email"
              value={draft.profile.email}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  profile: { ...current.profile, email: event.target.value },
                }))
              }
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="CEP" htmlFor="zip">
            <Input
              id="zip"
              value={draft.address.zip}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: { ...current.address, zip: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Número" htmlFor="number">
            <Input
              id="number"
              value={draft.address.number}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: { ...current.address, number: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Rua" htmlFor="street" className="sm:col-span-2">
            <Input
              id="street"
              value={draft.address.street}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: { ...current.address, street: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Complemento" htmlFor="complement">
            <Input
              id="complement"
              value={draft.address.complement}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: {
                    ...current.address,
                    complement: event.target.value,
                  },
                }))
              }
            />
          </Field>
          <Field label="Bairro" htmlFor="neighborhood">
            <Input
              id="neighborhood"
              value={draft.address.neighborhood}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: {
                    ...current.address,
                    neighborhood: event.target.value,
                  },
                }))
              }
            />
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input
              id="city"
              value={draft.address.city}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  address: { ...current.address, city: event.target.value },
                }))
              }
            />
          </Field>
          <Field label="Estado" htmlFor="state">
            <Select
              value={draft.address.state}
              onValueChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  address: { ...current.address, state: value },
                }))
              }
            >
              <SelectTrigger id="state" className="w-full">
                <SelectValue placeholder="UF" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Dias de funcionamento</Label>
            <div className="flex flex-wrap gap-3">
              {WEEK_DAYS.map((day) => {
                const checked = draft.hours.days.includes(day.id);
                const inputId = `day-${day.id}`;
                return (
                  <div
                    key={day.id}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <Checkbox
                      id={inputId}
                      checked={checked}
                      onCheckedChange={() => toggleDay(day.id)}
                    />
                    <Label htmlFor={inputId} className="font-normal">
                      {day.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Horário inicial" htmlFor="startTime">
              <Input
                id="startTime"
                type="time"
                value={draft.hours.startTime}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    hours: {
                      ...current.hours,
                      startTime: event.target.value,
                    },
                  }))
                }
              />
            </Field>
            <Field label="Horário final" htmlFor="endTime">
              <Input
                id="endTime"
                type="time"
                value={draft.hours.endTime}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    hours: { ...current.hours, endTime: event.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Duração padrão (min)" htmlFor="duration">
              <Input
                id="duration"
                type="number"
                min={10}
                step={5}
                value={draft.hours.defaultDurationMinutes}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    hours: {
                      ...current.hours,
                      defaultDurationMinutes: Number(event.target.value) || 30,
                    },
                  }))
                }
              />
            </Field>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <SummaryItem label="Clínica" value={draft.profile.name} />
          <SummaryItem label="Documento" value={draft.profile.document} />
          <SummaryItem
            label="Contato"
            value={`${draft.profile.phone} · ${draft.profile.email}`}
          />
          <SummaryItem
            label="Endereço"
            value={`${draft.address.street}, ${draft.address.number} — ${draft.address.city}/${draft.address.state}`}
          />
          <SummaryItem
            label="Funcionamento"
            value={`${draft.hours.days.join(", ").toUpperCase()} · ${draft.hours.startTime}–${draft.hours.endTime} · ${draft.hours.defaultDurationMinutes} min`}
          />
          <p className="text-xs text-muted-foreground">
            Dados salvos localmente via mock de desenvolvimento.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={back}
          disabled={step === 0 || loading}
        >
          Voltar
        </Button>

        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next}>
            Continuar
          </Button>
        ) : (
          <Button type="button" onClick={finish} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Concluir"
            )}
          </Button>
        )}
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

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium text-foreground">{value || "—"}</p>
    </div>
  );
}
