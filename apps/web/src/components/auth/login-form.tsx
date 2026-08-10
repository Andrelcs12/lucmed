"use client";

import { Alert, AlertDescription } from "@lucmed/ui/components/alert";
import { Button } from "@lucmed/ui/components/button";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/constants/routes";
import { authService } from "@/services/auth/auth.service";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await authService.login({ email, password });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(routes.dashboard);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
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
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="password">Senha</Label>
          <Link
            href={routes.forgotPassword}
            className="text-xs font-medium text-primary hover:underline"
          >
            Esqueci a senha
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          href={routes.register}
          className="font-medium text-primary hover:underline"
        >
          Cadastre-se
        </Link>
      </p>

      <p className="rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
        Autenticação mock para desenvolvimento — qualquer e-mail com senha de 6+
        caracteres funciona.
      </p>
    </form>
  );
}
