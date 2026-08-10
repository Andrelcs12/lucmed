import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: URL da CLI fica aqui (não no schema.prisma).
// Supabase: preferir DIRECT_URL (session/direct :5432) nas migrations.
// Se ainda não tiver DIRECT_URL, cai no DATABASE_URL.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "Defina DIRECT_URL (recomendado) ou DATABASE_URL em apps/api/.env",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
