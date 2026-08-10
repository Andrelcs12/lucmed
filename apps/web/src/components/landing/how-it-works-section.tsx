const steps = [
  {
    step: "1",
    title: "Configure sua clínica",
    description: "Informe dados básicos, endereço e horários de funcionamento.",
  },
  {
    step: "2",
    title: "Cadastre pacientes",
    description: "Organize a base com busca, filtros e histórico acessível.",
  },
  {
    step: "3",
    title: "Organize sua agenda",
    description: "Monte o dia e a semana com consultas e disponibilidade.",
  },
  {
    step: "4",
    title: "Gerencie atendimentos",
    description: "Acompanhe a rotina no painel e mantenha a operação fluindo.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Como funciona
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Um caminho direto do setup à operação diária.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step} className="relative">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
