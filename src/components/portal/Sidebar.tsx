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
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ComponentType } from "react";
import { alunos } from "@/lib/portal-data";

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
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground min-h-screen border-r border-sidebar-border">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-radar-alfa-icon.svg"
            alt="Ícone Radar Alfa"
            className="h-9 w-9 shrink-0"
          />
          <div>
            <div className="font-semibold leading-tight">Radar Alfa</div>
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

function getMobileHeaderInfo(pathname: string) {
  const normalized = pathname.replace(/\/$/, "");

  const historicoMatch = normalized.match(/^\/radar\/aluno\/([^/]+)\/historico$/);
  if (historicoMatch) {
    const studentId = historicoMatch[1];
    const student = alunos.find((a) => a.id === studentId);
    return {
      title: student ? `${student.nome} (Histórico)` : "Histórico",
      backTo: `/radar/aluno/${studentId}`,
    };
  }

  const alunoMatch = normalized.match(/^\/radar\/aluno\/([^/]+)$/);
  if (alunoMatch) {
    const studentId = alunoMatch[1];
    const student = alunos.find((a) => a.id === studentId);
    return {
      title: student ? student.nome : "Perfil do Aluno",
      backTo: "/radar/pedagogico",
    };
  }

  if (normalized === "/tutor/provas") {
    return {
      title: "Revisar Provas",
      backTo: "/tutor",
    };
  }

  return null;
}

export function PortalBottomNav({ variant }: { variant: "coordenador" | "aluno" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuMaisOpen, setMenuMaisOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close "Mais" menu when pathname changes or user clicks outside
  useEffect(() => {
    setMenuMaisOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuMaisOpen(false);
      }
    }
    if (menuMaisOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuMaisOpen]);

  const normalized = pathname.replace(/\/$/, "") || "/";

  if (variant === "aluno") {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-center justify-around z-50 px-2">
        {alunoItems.map((it, i) => {
          const isActive = it.exact
            ? normalized === it.to
            : normalized === it.to || normalized.startsWith(it.to + "/");
          return (
            <Link
              key={i}
              to={it.to}
              className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 text-center transition-colors ${
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <it.icon className="h-5 w-5" />
              <span className="text-xs tracking-tight">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // Coordinator: Início, Radar Pedagógico, Agenda, Indicadores + Mais (Alunos, Configurações, Sair)
  const tabItems = [
    coordItems[0], // Início
    coordItems[2], // Radar Pedagógico
    coordItems[3], // Agenda
    coordItems[4], // Indicadores
  ];

  const moreItems = [
    coordItems[1], // Alunos
    coordItems[5], // Configurações
  ];

  const isMoreActive = moreItems.some((it) => {
    return normalized === it.to || normalized.startsWith(it.to + "/");
  });

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-center justify-around z-50 px-2">
      {tabItems.map((it, i) => {
        const isActive = it.exact
          ? normalized === it.to
          : normalized === it.to || normalized.startsWith(it.to + "/");
        return (
          <Link
            key={i}
            to={it.to}
            className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 text-center transition-colors ${
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <it.icon className="h-5 w-5" />
            <span className="text-xs tracking-tight">{it.label}</span>
          </Link>
        );
      })}

      {/* "Mais" Menu Trigger */}
      <div className="flex-1 relative flex flex-col items-center justify-center" ref={menuRef}>
        <button
          onClick={() => setMenuMaisOpen(!menuMaisOpen)}
          className={`flex flex-col items-center justify-center w-full py-1 gap-1 text-center transition-colors ${
            menuMaisOpen || isMoreActive
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-xs tracking-tight">Mais</span>
        </button>

        {/* Popover / Overlay style for remaining items */}
        {menuMaisOpen && (
          <div className="absolute bottom-[72px] right-2 w-48 bg-card border border-border rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1 animate-in slide-in-from-bottom-2 duration-150">
            {moreItems.map((it, i) => {
              const isActive = normalized === it.to || normalized.startsWith(it.to + "/");
              return (
                <Link
                  key={i}
                  to={it.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <it.icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
            <hr className="border-border my-1" />
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export function PortalShell({
  variant,
  children,
}: {
  variant: "coordenador" | "aluno";
  children: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const headerInfo = getMobileHeaderInfo(pathname);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-background">
      {/* Desktop Sidebar */}
      <PortalSidebar variant={variant} />

      {/* Mobile Top Header */}
      {(variant === "aluno" || headerInfo) && (
        <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm flex items-center justify-between px-4 z-40">
          <div className="flex items-center min-w-0">
            {headerInfo ? (
              <>
                <Link
                  to={headerInfo.backTo}
                  className="h-9 w-9 rounded-lg flex items-center justify-center bg-primary-soft text-primary hover:bg-primary-soft/80 active:scale-95 transition-all mr-3 shrink-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <span className="font-semibold text-foreground text-sm tracking-tight truncate">
                  {headerInfo.title}
                </span>
              </>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/logo-radar-alfa-icon.svg"
                  alt="Ícone Radar Alfa"
                  className="h-8 w-8 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-sm leading-tight text-foreground truncate">Radar Alfa</div>
                  <div className="text-xs text-muted-foreground leading-none mt-0.5">
                    Aluno
                  </div>
                </div>
              </Link>
            )}
          </div>
          {variant === "aluno" && (
            <Link
              to="/"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all shrink-0 ml-2"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Link>
          )}
        </header>
      )}

      {/* Main content wrapper */}
      <main className={`flex-1 min-w-0 pb-20 md:pb-0 ${(variant === "aluno" || headerInfo) ? "pt-14 md:pt-0" : "pt-0"}`}>
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <PortalBottomNav variant={variant} />
    </div>
  );
}
