import {
  mockLogin,
  mockRegister,
  mockRequestPasswordReset,
  mockResetPassword,
} from "@/mocks/auth";
import type { AuthResult, LoginInput, RegisterInput } from "@/types/auth";

/**
 * Auth service — currently backed by mocks.
 * Swap the mock imports for API calls when backend auth is ready.
 */
export const authService = {
  async login(input: LoginInput): Promise<AuthResult> {
    const result = await mockLogin(input);
    if ("error" in result) return { ok: false, error: result.error };
    return { ok: true, user: result.user };
  },

  async register(input: RegisterInput): Promise<AuthResult> {
    const result = await mockRegister(input);
    if ("error" in result) return { ok: false, error: result.error };
    return { ok: true, user: result.user };
  },

  async requestPasswordReset(email: string) {
    return mockRequestPasswordReset(email);
  },

  async resetPassword(password: string) {
    return mockResetPassword(password);
  },
};
