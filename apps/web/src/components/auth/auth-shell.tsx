import Link from "next/link";
import { brand } from "@/constants/brand";
import { routes } from "@/constants/routes";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.14),_transparent_50%),linear-gradient(180deg,#eef8f7_0%,#f7fafb_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <Link
            href={routes.home}
            className="text-2xl font-bold tracking-tight text-primary"
          >
            {brand.name}
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
