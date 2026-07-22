import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { desempenho } from "@/lib/portal-data";

export const Route = createFileRoute("/tutor/desempenho")({
  head: () => ({
    meta: [
      { title: "Meu Desempenho — Portal Atlas" },
      { name: "description", content: "Comparativo de desempenho por matéria." },
      { property: "og:title", content: "Meu Desempenho" },
      { property: "og:description", content: "Percentual por matéria e tendência." },
    ],
  }),
  component: DesempenhoPage,
});

function DesempenhoPage() {
  const max = 100;
  return (
    <PortalShell variant="aluno">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Desempenho</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Seu progresso por matéria
        </h1>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <h2 className="text-sm font-semibold text-foreground mb-6">Comparativo</h2>
          <div className="space-y-5">
            {desempenho.map((d) => (
              <div key={d.materia}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{d.materia}</span>
                  <span className="text-muted-foreground">{d.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    style={{ width: `${(d.pct / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {desempenho.map((d) => {
            const Icon = d.var > 0 ? TrendingUp : d.var < 0 ? TrendingDown : Minus;
            const tone =
              d.var > 0
                ? "text-success bg-success/10"
                : d.var < 0
                  ? "text-danger bg-danger/10"
                  : "text-muted-foreground bg-muted";
            return (
              <div
                key={d.materia}
                className="bg-card border border-border rounded-2xl p-4 shadow-soft flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-foreground">{d.materia}</div>
                  <div className="text-2xl font-semibold text-foreground mt-0.5">{d.pct}%</div>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${tone}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {d.var > 0 ? `+${d.var}` : d.var < 0 ? d.var : "0"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
