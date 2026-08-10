import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar conta",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Criar sua conta"
      description="Comece configurando o acesso à sua clínica."
    >
      <RegisterForm />
    </AuthShell>
  );
}
