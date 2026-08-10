import { Button } from "@lucmed/ui/components/button";
import { Skeleton } from "@lucmed/ui/components/skeleton";
import { AlertCircle, Inbox, RefreshCw } from "lucide-react";

export function LoadingBlock({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }, (_, index) => {
        const id = `loading-${index + 1}`;
        return <Skeleton key={id} className="h-14 w-full rounded-xl" />;
      })}
    </div>
  );
}

export function EmptyBlock({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <Inbox
        className="mx-auto size-8 text-muted-foreground"
        aria-hidden="true"
      />
      <h2 className="mt-3 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6"
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="size-4" aria-hidden="true" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="size-4" />
          Tentar novamente
        </Button>
      ) : null}
    </div>
  );
}
