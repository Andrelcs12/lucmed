import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";

const links = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: routes.login, label: "Entrar" },
  { href: routes.register, label: "Criar conta" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-lg font-bold tracking-tight">{brand.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {brand.tagline}
          </p>
        </div>

        <nav
          aria-label="Rodapé"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
        >
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>

      <div className="border-t border-border/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <p>
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p>Feito para clínicas que valorizam organização.</p>
        </div>
      </div>
    </footer>
  );
}
