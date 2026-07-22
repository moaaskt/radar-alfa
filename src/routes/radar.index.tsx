import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Users, Calendar, TrendingUp } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos, resumo } from "@/lib/portal-data";

export const Route = createFileRoute("/radar/")({
  head: () => ({
    meta: [
      { title: "Início — Portal Atlas" },
      { name: "description", content: "Visão geral do coordenador no Portal Atlas." },
      { property: "og:title", content: "Início — Coordenação" },
      { property: "og:description", content: "Painel inicial da coordenação." },
    ],
  }),
  component: InicioPage,
});

function InicioPage() {
  return (
    <PortalShell variant="coordenador">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Coordenação</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Bom dia, Coordenador 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aqui está um resumo rápido do dia.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="text-xs text-muted-foreground">Alunos monitorados</p>
            <p className="text-3xl font-semibold text-foreground mt-1">{alunos.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="text-xs text-muted-foreground">Alto risco</p>
            <p className="text-3xl font-semibold text-destructive mt-1">{resumo.alto}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="text-xs text-muted-foreground">Em atenção</p>
            <p className="text-3xl font-semibold text-warning mt-1">{resumo.atencao}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link
            to="/radar/pedagogico"
            className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:border-primary/40 transition flex items-center gap-4"
          >
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <Radar className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">Abrir Radar Pedagógico</div>
              <div className="text-xs text-muted-foreground">Ver alunos prioritários</div>
            </div>
          </Link>
          <Link
            to="/radar/alunos"
            className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:border-primary/40 transition flex items-center gap-4"
          >
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">Lista de alunos</div>
              <div className="text-xs text-muted-foreground">Consultar toda a base</div>
            </div>
          </Link>
          <Link
            to="/radar/agenda"
            className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:border-primary/40 transition flex items-center gap-4"
          >
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">Agenda</div>
              <div className="text-xs text-muted-foreground">Próximas reuniões</div>
            </div>
          </Link>
          <Link
            to="/radar/indicadores"
            className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:border-primary/40 transition flex items-center gap-4"
          >
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">Indicadores</div>
              <div className="text-xs text-muted-foreground">Métricas gerais</div>
            </div>
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}
