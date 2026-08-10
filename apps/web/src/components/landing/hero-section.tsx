"use client";

import { Button } from "@lucmed/ui/components/button";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.18),_transparent_55%),linear-gradient(180deg,#eef8f7_0%,#f7fafb_55%,#f7fafb_100%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-8%] h-64 w-64 rounded-full bg-accent/80 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, -14, 0], x: [0, 12, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
        <motion.div
          className="max-w-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
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
        </motion.div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/40 blur-xl"
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <DashboardPreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
