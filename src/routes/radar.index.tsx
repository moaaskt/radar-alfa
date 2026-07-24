// impeccable-disable clipped-overflow-container
import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Users, Calendar, TrendingUp, AlertCircle, AlertTriangle } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos, resumo } from "@/lib/portal-data";

export const Route = createFileRoute("/radar/")({
  head: () => ({
    meta: [
      { title: "Início — Radar Alfa" },
      { name: "description", content: "Visão geral do coordenador no Radar Alfa." },
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
          <div className="bg-card border border-border border-l-2 border-l-primary rounded-xl p-5 shadow-soft">
            <div className="flex items-center gap-1.5 text-primary">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Alunos monitorados</span>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2 leading-none">{alunos.length}</p>
          </div>
          <div className="bg-card border border-border border-l-2 border-l-destructive rounded-xl p-5 shadow-soft">
            <div className="flex items-center gap-1.5 text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Alto risco</span>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2 leading-none">{resumo.alto}</p>
          </div>
          <div className="bg-card border border-border border-l-2 border-l-warning rounded-xl p-5 shadow-soft">
            <div className="flex items-center gap-1.5 text-warning">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Atenção</span>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2 leading-none">{resumo.atencao}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { to: "/radar/pedagogico" as const, label: "Abrir Radar Pedagógico", desc: "Ver alunos prioritários", icon: Radar },
            { to: "/radar/alunos" as const, label: "Lista de alunos", desc: "Consultar toda a base", icon: Users },
            { to: "/radar/agenda" as const, label: "Agenda", desc: "Próximas reuniões", icon: Calendar },
            { to: "/radar/indicadores" as const, label: "Indicadores", desc: "Métricas gerais", icon: TrendingUp },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="group relative overflow-hidden bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card hover:border-primary/50 hover:bg-primary/[0.01] transition duration-300 flex flex-col justify-between min-h-[110px]"
            >
              <div className="relative z-10 text-left">
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors duration-300">{item.desc}</div>
              </div>
              <div className="absolute right-[-12px] bottom-[-12px] text-primary opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-300 ease-out pointer-events-none">
                <item.icon className="h-20 w-20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
