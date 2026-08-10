"use client";

import { cn } from "@lucmed/ui/lib/utils";
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";

const items = [
  { href: routes.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routes.schedule, label: "Agenda", icon: CalendarDays },
  { href: routes.patients, label: "Pacientes", icon: Users },
  { href: routes.appointments, label: "Atendimentos", icon: Stethoscope },
  { href: routes.settings, label: "Configurações", icon: Settings },
  { href: routes.checkout, label: "Checkout", icon: CreditCard },
] as const;

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link
          href={routes.dashboard}
          className="text-lg font-bold tracking-tight text-primary"
          onClick={onNavigate}
        >
          {brand.name}
        </Link>
      </div>

      <nav aria-label="Menu principal" className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          Dados mock · desenvolvimento
        </p>
      </div>
    </aside>
  );
}
