import { DashboardPreview } from "./dashboard-preview";
import { Reveal } from "./reveal";

export function PreviewSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,118,110,0.12),_transparent_65%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Preview do sistema
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Uma visão limpa do painel: consultas do dia, pacientes e a navegação
            da clínica em um só lugar.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-4xl" delay={0.1} y={28}>
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  );
}
