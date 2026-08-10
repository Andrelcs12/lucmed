"use client";

import { Alert, AlertDescription } from "@lucmed/ui/components/alert";
import { Button } from "@lucmed/ui/components/button";
import { Checkbox } from "@lucmed/ui/components/checkbox";
import { Input } from "@lucmed/ui/components/input";
import { Label } from "@lucmed/ui/components/label";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/constants/routes";
import { authService } from "@/services/auth/auth.service";
import { PasswordInput } from "./password-input";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!acceptedTerms) {
      setError("Aceite os termos para continuar.");
      return;
    }

    setLoading(true);
    const result = await authService.register({ name, email, password });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(routes.onboarding);
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
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          autoComplete="name"
          placeholder="Seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={loading}
        />
      </div>

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
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          disabled={loading}
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed font-normal">
          Concordo com os termos de uso e a política de privacidade do LucMed.
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Criando conta...
          </>
        ) : (
          "Criar conta"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link
          href={routes.login}
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
