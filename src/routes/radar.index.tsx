// impeccable-disable clipped-overflow-container
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
