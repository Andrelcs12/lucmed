import { Button } from "@lucmed/ui/components/button";
import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 left-10 size-48 rounded-full bg-black/10 blur-2xl"
            />

            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                Comece a organizar sua clínica com o {brand.name}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/85">
                Configure a unidade, cadastre pacientes e monte a agenda em um
                fluxo simples e profissional.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-11 bg-white text-primary hover:bg-white/90"
                >
                  <Link href={routes.register}>Criar conta</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link href={routes.login}>Entrar</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
