import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Users,
  Radar,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  MessageCircle,
  BookOpen,
  BarChart3,
  Target,
} from "lucide-react";
import type { ComponentType } from "react";

type Item = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
};

const coordItems: Item[] = [
  { to: "/radar", label: "Início", icon: Home, exact: true },
  { to: "/radar/alunos", label: "Alunos", icon: Users },
  { to: "/radar/pedagogico", label: "Radar Pedagógico", icon: Radar },
  { to: "/radar/agenda", label: "Agenda", icon: Calendar },
  { to: "/radar/indicadores", label: "Indicadores", icon: TrendingUp },
  { to: "/radar/config", label: "Configurações", icon: Settings },
];

const alunoItems: Item[] = [
  { to: "/tutor", label: "Tutor", icon: MessageCircle, exact: true },
  { to: "/tutor/plano", label: "Meu Plano", icon: BookOpen },
  { to: "/tutor/desempenho", label: "Meu Desempenho", icon: BarChart3 },
  { to: "/tutor/meta", label: "Minha Meta", icon: Target },
];

export function PortalSidebar({ variant }: { variant: "coordenador" | "aluno" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = variant === "coordenador" ? coordItems : alunoItems;

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground min-h-screen">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center font-bold">
            A
          </div>
          <div>
            <div className="font-semibold leading-tight">Portal Atlas</div>
            <div className="text-xs text-sidebar-foreground/70">
              {variant === "coordenador" ? "Coordenação" : "Aluno"}
            </div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it, i) => {
          const normalized = pathname.replace(/\/$/, "") || "/";
          const isActive = it.exact
            ? normalized === it.to
            : normalized === it.to || normalized.startsWith(it.to + "/");
          return (
            <Link
              key={i}
              to={it.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Link>
      </div>
    </aside>
  );
}

export function PortalShell({
  variant,
  children,
}: {
  variant: "coordenador" | "aluno";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <PortalSidebar variant={variant} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
