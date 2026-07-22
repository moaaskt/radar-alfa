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

function StatusCard({
  tone,
  Icon,
  label,
  count,
}: {
  tone: "danger" | "warning" | "success";
  Icon: typeof AlertCircle;
  label: string;
  count: number;
}) {
  const styles = {
    danger: "bg-danger/10 text-danger border-danger/20",
    warning: "bg-warning/15 text-warning-foreground border-warning/30",
    success: "bg-success/10 text-success border-success/20",
  }[tone];
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-soft flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl grid place-items-center border ${styles}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-3xl font-semibold text-foreground leading-none">{count}</div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <StatusCard tone="danger" Icon={AlertCircle} label="Alto risco" count={resumo.alto} />
          <StatusCard tone="warning" Icon={AlertTriangle} label="Atenção" count={resumo.atencao} />
          <StatusCard
            tone="success"
            Icon={CheckCircle2}
            label="Dentro do esperado"
            count={resumo.ok}
          />
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
