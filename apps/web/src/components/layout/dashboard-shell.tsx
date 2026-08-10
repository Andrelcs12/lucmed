import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 bg-background">
      <div className="hidden md:block">
        <div className="sticky top-0 h-screen">
          <AppSidebar />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} />
        <div className="flex-1 px-4 py-6 md:px-6">{children}</div>
      </div>
    </div>
  );
}
