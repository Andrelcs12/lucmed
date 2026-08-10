import {
  Building2,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  Gauge,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "Gestão da clínica",
    description:
      "Centralize dados, horários e preferências da unidade em um só lugar.",
  },
  {
    icon: Users,
    title: "Pacientes",
    description:
      "Cadastro organizado, busca rápida e histórico acessível para a equipe.",
  },
  {
    icon: CalendarDays,
    title: "Agenda",
    description:
      "Visualize o dia e a semana, com consultas e disponibilidade claros.",
  },
  {
    icon: FolderOpen,
    title: "Organização",
    description:
      "Menos planilhas soltas. Mais consistência no atendimento e na recepção.",
  },
  {
    icon: ClipboardList,
    title: "Histórico",
    description:
      "Acompanhe consultas e informações importantes sem perder contexto.",
  },
  {
    icon: Gauge,
    title: "Produtividade",
    description:
      "Fluxos objetivos para a equipe focar no que importa: o paciente.",
  },
] as const;

export function BenefitsSection() {
  return (
    <section id="beneficios" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            O essencial para operar com calma
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            O LucMed concentra a rotina da clínica em ferramentas práticas, sem
            complicar o dia a dia da equipe.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="space-y-3">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <benefit.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
