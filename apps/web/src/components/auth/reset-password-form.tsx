"use client";

import { Alert, AlertDescription } from "@lucmed/ui/components/alert";
import { Button } from "@lucmed/ui/components/button";
import { Label } from "@lucmed/ui/components/label";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { routes } from "@/constants/routes";
import { authService } from "@/services/auth/auth.service";
import { PasswordInput } from "./password-input";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const result = await authService.resetPassword(password);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    toast.success("Senha atualizada (mock). Faça login novamente.");
    router.push(routes.login);
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
        <Label htmlFor="password">Nova senha</Label>
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
        <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Salvando...
          </>
        ) : (
          "Redefinir senha"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={routes.login}
          className="font-medium text-primary hover:underline"
        >
          Voltar ao login
        </Link>
      </p>
    </form>
  );
}
