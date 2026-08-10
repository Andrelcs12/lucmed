"use client";

import { Toaster } from "@lucmed/ui/components/sonner";
import { TooltipProvider } from "@lucmed/ui/components/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </TooltipProvider>
  );
}
