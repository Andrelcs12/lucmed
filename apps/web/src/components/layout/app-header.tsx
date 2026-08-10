"use client";

import { Avatar, AvatarFallback } from "@lucmed/ui/components/avatar";
import { Button } from "@lucmed/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@lucmed/ui/components/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";

export function AppHeader({ title }: { title: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(18rem,100vw)] p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu de navegação</SheetTitle>
            </SheetHeader>
            <AppSidebar onNavigate={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">Usuário Demo</p>
          <p className="text-xs text-muted-foreground">Clínica LucMed Demo</p>
        </div>
        <Avatar>
          <AvatarFallback>UD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
