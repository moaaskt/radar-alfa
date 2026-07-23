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

        {/* Asymmetric metric layout — hero "Alunos em risco" + secondary companions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          {/* Hero card: Alunos em risco — the actionable metric */}
          <div className="relative overflow-hidden md:col-span-2 md:row-span-2 bg-card border border-border border-l-2 border-l-destructive rounded-xl p-6 md:p-8 shadow-soft flex flex-col justify-between">
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Alunos em risco</p>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-5xl md:text-6xl font-bold text-foreground leading-none">12</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                  <TrendingUp className="h-3.5 w-3.5" />
                  -2
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">alunos precisam de intervenção</p>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] text-destructive opacity-[0.04] pointer-events-none">
              <TrendingDown className="h-24 w-24" />
            </div>
          </div>

          {/* Secondary metrics */}
          {[
            { label: "Frequência média", valor: "92%", delta: "+1.2%", up: true },
            { label: "Desempenho médio", valor: "78%", delta: "+0.6%", up: true },
            { label: "Engajamento Plurall", valor: "64%", delta: "-3.4%", up: false },
          ].map((m) => (
            <div
              key={m.label}
              className={`md:col-span-3 bg-card border border-border border-l-2 ${m.up ? "border-l-success" : "border-l-destructive"} rounded-xl p-5 shadow-soft flex items-center justify-between`}
            >
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-foreground leading-none">{m.valor}</span>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${m.up ? "text-success" : "text-destructive"}`}>
                    {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {m.delta}
                  </span>
                </div>
              </div>
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
