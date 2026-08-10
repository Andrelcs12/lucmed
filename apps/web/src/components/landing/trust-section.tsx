import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Organização",
    description:
      "Informações da clínica estruturadas para a equipe encontrar o que precisa com rapidez.",
  },
  {
    icon: LockKeyhole,
    title: "Segurança",
    description:
      "Fluxos preparados para autenticação e controle de acesso — sem expor dados sensíveis no frontend.",
  },
  {
    icon: Sparkles,
    title: "Praticidade",
    description:
      "Interface direta, estados claros e navegação pensada para o ritmo da recepção e do consultório.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="border-y border-border/70 bg-secondary/35 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Segurança e confiança
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Construímos o LucMed para ser previsível, organizado e pronto para
            evoluir com integrações reais.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="space-y-3">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-background text-primary ring-1 ring-border">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
