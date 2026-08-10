"use client";

import { Badge } from "@lucmed/ui/components/badge";
import { Button } from "@lucmed/ui/components/button";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { CheckCircle2, Copy, Loader2, QrCode, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { routes } from "@/constants/routes";
import { checkoutService } from "@/services/payments/checkout.service";
import type { CheckoutStatus, PaymentMethod, PlanId } from "@/types/payments";
import { formatCurrency } from "@/utils/format";

const steps = [
  "Plano",
  "Checkout",
  "Pagamento",
  "Processamento",
  "Resultado",
] as const;

export function CheckoutFlow() {
  const plans = useMemo(() => checkoutService.listPlans(), []);
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState<PlanId>("pro");
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [message, setMessage] = useState("");
  const [pixCode, setPixCode] = useState<string | undefined>();
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const selectedPlan = plans.find((plan) => plan.id === planId) ?? plans[0];

  async function processPayment() {
    setStep(3);
    setStatus("processing");
    setMessage("Processando pagamento...");

    const result = await checkoutService.checkout({
      planId,
      method,
      cardName: card.name,
      cardNumber: card.number,
      cardExpiry: card.expiry,
      cardCvv: card.cvv,
    });

    setStatus(result.status);
    setMessage(result.message);
    setPixCode(result.pixCode);
    setStep(4);
  }

  function copyPix() {
    if (!pixCode) return;
    void navigator.clipboard.writeText(pixCode);
    toast.success("Código PIX copiado.");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
        Checkout Asaas simulado — sem chaves de API no frontend.
      </p>

      <ol className="flex flex-wrap gap-2">
        {steps.map((label, index) => (
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

      {step === 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPlanId(plan.id)}
              className={`rounded-xl border p-5 text-left transition-colors ${
                planId === plan.id
                  ? "border-primary bg-accent/50"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{plan.name}</p>
                {planId === plan.id ? <Badge>Selecionado</Badge> : null}
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(plan.price)}
                <span className="text-sm font-normal text-muted-foreground">
                  /mês
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature}>· {feature}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Resumo do checkout</h2>
          <p className="text-sm text-muted-foreground">
            Plano <strong>{selectedPlan.name}</strong> por{" "}
            <strong>{formatCurrency(selectedPlan.price)}</strong>/mês.
          </p>
          <p className="text-sm text-muted-foreground">
            Em produção, esta etapa criará uma cobrança via Asaas no backend.
          </p>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={method === "pix" ? "default" : "outline"}
              onClick={() => setMethod("pix")}
            >
              PIX
            </Button>
            <Button
              type="button"
              variant={method === "card" ? "default" : "outline"}
              onClick={() => setMethod("card")}
            >
              Cartão
            </Button>
          </div>

          {method === "pix" ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Ao continuar, geraremos um QR Code e um código copia e cola
                simulados.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cardName">Nome no cartão</Label>
                <Input
                  id="cardName"
                  value={card.name}
                  onChange={(event) =>
                    setCard((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cardNumber">Número</Label>
                <Input
                  id="cardNumber"
                  inputMode="numeric"
                  placeholder="4111 1111 1111 1111"
                  value={card.number}
                  onChange={(event) =>
                    setCard((current) => ({
                      ...current,
                      number: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Validade</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/AA"
                  value={card.expiry}
                  onChange={(event) =>
                    setCard((current) => ({
                      ...current,
                      expiry: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  inputMode="numeric"
                  placeholder="123"
                  value={card.cvv}
                  onChange={(event) =>
                    setCard((current) => ({
                      ...current,
                      cvv: event.target.value,
                    }))
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Dica mock: cartão terminando em 0000 simula erro.
              </p>
            </div>
          )}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="font-medium">Processando...</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            {status === "success" ? (
              <CheckCircle2 className="size-6 text-primary" />
            ) : status === "pending" ? (
              <QrCode className="size-6 text-primary" />
            ) : (
              <XCircle className="size-6 text-destructive" />
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {status === "success"
                  ? "Pagamento confirmado"
                  : status === "pending"
                    ? "Aguardando PIX"
                    : "Falha no pagamento"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{message}</p>
            </div>
          </div>

          {status === "pending" && pixCode ? (
            <div className="space-y-3">
              <div className="flex aspect-square max-w-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
                <div className="text-center">
                  <QrCode className="mx-auto size-16 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    QR Code placeholder
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pixCode">Código copia e cola</Label>
                <div className="flex gap-2">
                  <Input id="pixCode" readOnly value={pixCode} />
                  <Button type="button" variant="outline" onClick={copyPix}>
                    <Copy className="size-4" />
                    Copiar
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={routes.dashboard}>Ir ao dashboard</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep(0);
                setStatus("idle");
                setMessage("");
                setPixCode(undefined);
              }}
            >
              Novo checkout
            </Button>
          </div>
        </div>
      ) : null}

      {step < 3 ? (
        <div className="flex justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            Voltar
          </Button>
          {step < 2 ? (
            <Button type="button" onClick={() => setStep((value) => value + 1)}>
              Continuar
            </Button>
          ) : (
            <Button type="button" onClick={() => void processPayment()}>
              Pagar {formatCurrency(selectedPlan.price)}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
