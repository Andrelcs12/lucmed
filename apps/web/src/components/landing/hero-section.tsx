import { Button } from "@lucmed/ui/components/button";
import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.18),_transparent_55%),linear-gradient(180deg,#eef8f7_0%,#f7fafb_55%,#f7fafb_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-8%] h-64 w-64 rounded-full bg-accent/80 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {brand.name}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Organize sua clínica com clareza e tranquilidade.
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pacientes, agenda e rotina clínica em um fluxo simples — pensado
            para equipes que precisam de organização no dia a dia.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href={routes.register}>Começar agora</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6">
              <Link href={routes.login}>Já tenho conta</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/40 blur-xl"
          />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
