import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, AlertCircle, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos, resumo } from "@/lib/portal-data";

export const Route = createFileRoute("/radar/pedagogico")({
  head: () => ({
    meta: [
      { title: "Radar Pedagógico — Portal Atlas" },
      {
        name: "description",
        content: "Visão do coordenador: alunos prioritários e índice de risco.",
      },
      { property: "og:title", content: "Radar Pedagógico" },
      {
        property: "og:description",
        content: "Acompanhe alunos prioritários com o Radar Pedagógico Inteligente.",
      },
    ],
  }),
  component: RadarPage,
});

function RiskBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? "bg-danger" : pct >= 60 ? "bg-warning" : "bg-success";
  return (
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function RadarPage() {
  const [query, setQuery] = useState("");
  const filtered = alunos.filter((a) => a.nome.toLowerCase().includes(query.toLowerCase()));

  return (
    <PortalShell variant="coordenador">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Coordenação</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
              Radar Pedagógico
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visão consolidada dos alunos que precisam de atenção
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar aluno..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Asymmetric status cards — hero "Alto risco" + secondary companions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Hero card: Alto risco — spans 2 columns on desktop */}
          <div className="relative overflow-hidden md:col-span-2 bg-card border border-border border-l-2 border-l-destructive rounded-xl p-6 md:p-8 shadow-soft">
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Alto risco</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-foreground mt-3 leading-none">{resumo.alto}</div>
                <p className="text-sm text-muted-foreground mt-2">alunos precisam de intervenção imediata</p>
              </div>
            </div>
            <div className="absolute right-[-12px] bottom-[-12px] text-destructive opacity-[0.05] pointer-events-none">
              <AlertCircle className="h-28 w-28" />
            </div>
          </div>

          {/* Secondary cards stacked in the third column */}
          <div className="flex flex-col gap-4">
            {/* Atenção */}
            <div className="flex-1 bg-card border border-border border-l-2 border-l-warning rounded-xl p-5 shadow-soft">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Atenção</span>
              </div>
              <div className="text-3xl font-bold text-foreground mt-2 leading-none">{resumo.atencao}</div>
              <p className="text-xs text-muted-foreground mt-1">alunos em observação</p>
            </div>
            {/* Dentro do esperado */}
            <div className="flex-1 bg-card border border-border border-l-2 border-l-success rounded-xl p-5 shadow-soft">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Dentro do esperado</span>
              </div>
              <div className="text-3xl font-bold text-foreground mt-2 leading-none">{resumo.ok}</div>
              <p className="text-xs text-muted-foreground mt-1">alunos no caminho certo</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Alunos Prioritários</h2>
          <span className="text-xs text-muted-foreground">{filtered.length} exibidos</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to="/radar/aluno/$id"
              params={{ id: a.id }}
              className="group bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-card hover:border-primary/30 transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">
                  {a.nome
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-foreground">{a.nome}</div>
                    <div className="text-sm font-semibold text-foreground">{a.risco}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.turma}</div>
                  <div className="mt-2">
                    <RiskBar pct={a.risco} />
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
