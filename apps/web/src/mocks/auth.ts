import type { AuthUser, LoginInput, RegisterInput } from "@/types/auth";

/** Mock only — replace with real auth later. */
const DEMO_USER: AuthUser = {
  id: "user_demo",
  name: "Usuário Demo",
  email: "demo@lucmed.app",
};

export async function mockLogin(
  input: LoginInput,
): Promise<{ user: AuthUser } | { error: string }> {
  await delay(700);

  if (!input.email || !input.password) {
    return { error: "Informe e-mail e senha." };
  }

  if (input.password.length < 6) {
    return { error: "Senha inválida. Use pelo menos 6 caracteres." };
  }

  return {
    user: {
      ...DEMO_USER,
      email: input.email.trim().toLowerCase(),
      name: input.email.split("@")[0] || DEMO_USER.name,
    },
  };
}

export async function mockRegister(
  input: RegisterInput,
): Promise<{ user: AuthUser } | { error: string }> {
  await delay(800);

  if (!input.name.trim()) {
    return { error: "Informe seu nome." };
  }

  if (!input.email.includes("@")) {
    return { error: "Informe um e-mail válido." };
  }

  if (input.password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres." };
  }

  return {
    user: {
      id: "user_new",
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    },
  };
}

export async function mockRequestPasswordReset(
  email: string,
): Promise<{ ok: true } | { error: string }> {
  await delay(600);

  if (!email.includes("@")) {
    return { error: "Informe um e-mail válido." };
  }

  return { ok: true };
}

export async function mockResetPassword(
  password: string,
): Promise<{ ok: true } | { error: string }> {
  await delay(600);

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres." };
  }

  return { ok: true };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
