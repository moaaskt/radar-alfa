import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";

export const Route = createFileRoute("/radar/indicadores")({
  head: () => ({
    meta: [
      { title: "Indicadores — Portal Atlas" },
      { name: "description", content: "Indicadores gerais da coordenação." },
      { property: "og:title", content: "Indicadores" },
      { property: "og:description", content: "Métricas da escola." },
    ],
  }),
  component: IndicadoresPage,
});

const metricas = [
  { label: "Frequência média", valor: "92%", delta: "+1.2%", up: true },
  { label: "Desempenho médio", valor: "78%", delta: "+0.6%", up: true },
  { label: "Alunos em risco", valor: "12", delta: "-2", up: true },
  { label: "Engajamento Plurall", valor: "64%", delta: "-3.4%", up: false },
];

const turmas = [
  { nome: "6º Ano", desempenho: 82 },
  { nome: "7º Ano", desempenho: 76 },
  { nome: "8º Ano", desempenho: 71 },
  { nome: "9º Ano", desempenho: 80 },
];

function IndicadoresPage() {
  return (
    <PortalShell variant="coordenador">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Métricas</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Indicadores
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Panorama geral da escola.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {metricas.map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-2xl p-4 shadow-soft">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{m.valor}</p>
              <p
                className={`text-xs mt-1 inline-flex items-center gap-1 ${m.up ? "text-success" : "text-destructive"}`}
              >
                {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {m.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-card border border-border rounded-2xl p-5 shadow-soft">
          <h2 className="font-medium text-foreground">Desempenho por turma</h2>
          <div className="mt-4 space-y-3">
            {turmas.map((t) => (
              <div key={t.nome}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{t.nome}</span>
                  <span className="text-muted-foreground">{t.desempenho}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${t.desempenho}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
