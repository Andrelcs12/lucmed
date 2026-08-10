const appointments = [
  { time: "09:00", name: "Ana Souza", type: "Retorno" },
  { time: "10:30", name: "Carlos Lima", type: "Primeira consulta" },
  { time: "14:00", name: "Marina Dias", type: "Avaliação" },
] as const;

export function DashboardPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-[0_30px_80px_-40px_rgba(15,118,110,0.55)] ring-1 ring-primary/10 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#f87171]" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]" />
        <span className="size-2.5 rounded-full bg-[#34d399]" />
        <span className="ml-3 text-xs font-medium text-muted-foreground">
          Painel da clínica
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[140px_1fr] sm:p-5">
        <aside className="hidden space-y-2 rounded-xl bg-secondary/70 p-3 sm:block">
          {["Dashboard", "Agenda", "Pacientes", "Configurações"].map(
            (item, index) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/80"
                }`}
              >
                {item}
              </div>
            ),
          )}
        </aside>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "Hoje", value: "12" },
              { label: "Pacientes", value: "248" },
              { label: "Confirmadas", value: "9" },
              { label: "Pendentes", value: "3" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/80 bg-background px-3 py-3"
              >
                <p className="text-[11px] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border/80 bg-background p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Próximas consultas</p>
              <span className="text-[11px] text-muted-foreground">Hoje</span>
            </div>
            <ul className="space-y-2">
              {appointments.map((item) => (
                <li
                  key={item.time}
                  className="flex items-center justify-between rounded-lg bg-muted/70 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
