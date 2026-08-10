import { Button } from "@lucmed/ui/components/button";
import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";

const nav = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={routes.home}
          className="text-lg font-bold tracking-tight text-foreground"
        >
          {brand.name}
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href={routes.login}>Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={routes.register}>Começar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
