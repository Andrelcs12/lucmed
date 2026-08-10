const features = [
  {
    title: "Cadastro de pacientes",
    description:
      "Dados básicos, contato e status em uma lista clara para recepção e atendimento.",
  },
  {
    title: "Agenda diária e semanal",
    description:
      "Monte a grade da clínica, acompanhe horários e abra novas consultas com poucos cliques.",
  },
  {
    title: "Configuração da clínica",
    description:
      "Nome, endereço, horários de funcionamento e preferências de consulta.",
  },
  {
    title: "Painel operacional",
    description:
      "Visão do dia: consultas, pacientes recentes e atividade da equipe.",
  },
  {
    title: "Onboarding guiado",
    description:
      "Configure a clínica em etapas simples e comece a usar o sistema rapidamente.",
  },
  {
    title: "Checkout de planos",
    description:
      "Fluxo preparado para assinatura com PIX ou cartão — integração real depois.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      id="funcionalidades"
      className="scroll-mt-20 border-y border-border/70 bg-secondary/35 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Funcionalidades do produto
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Recursos pensados para a operação real de uma clínica — do primeiro
            cadastro ao acompanhamento diário.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-border/80 bg-background px-5 py-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
