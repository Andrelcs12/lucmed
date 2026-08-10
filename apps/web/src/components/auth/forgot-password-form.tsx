"use client";

import { Alert, AlertDescription } from "@lucmed/ui/components/alert";
import { Button } from "@lucmed/ui/components/button";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { routes } from "@/constants/routes";
import { authService } from "@/services/auth/auth.service";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await authService.requestPasswordReset(email);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setSuccess(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {success ? (
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertDescription>
            Se o e-mail existir, enviaremos instruções de recuperação. (Mock de
            desenvolvimento)
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="voce@clinica.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={loading || success}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || success}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar link"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={routes.login}
          className="font-medium text-primary hover:underline"
        >
          Voltar ao login
        </Link>
        {" · "}
        <Link
          href={routes.resetPassword}
          className="font-medium text-primary hover:underline"
        >
          Ir para redefinir
        </Link>
      </p>
    </form>
  );
}
