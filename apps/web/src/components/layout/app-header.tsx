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
import { AppSidebar } from "./app-sidebar";

export function AppHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <AppSidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
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
