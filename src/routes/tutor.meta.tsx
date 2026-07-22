import { createFileRoute } from "@tanstack/react-router";
import { Target, Sparkles } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";

export const Route = createFileRoute("/tutor/meta")({
  head: () => ({
    meta: [
      { title: "Minha Meta — Portal Atlas" },
      { name: "description", content: "Acompanhe sua meta pedagógica pessoal." },
      { property: "og:title", content: "Minha Meta" },
      { property: "og:description", content: "Acompanhe sua evolução rumo à meta." },
    ],
  }),
  component: MetaPage,
});

function MetaPage() {
  const atual = 65;
  const meta = 80;
  return (
    <PortalShell variant="aluno">
      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Objetivo</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Minha Meta
        </h1>

        <div className="mt-8 bg-card border border-border rounded-2xl p-8 shadow-card">
          <div className="flex items-center gap-3">
            <span className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <Target className="h-6 w-6" />
            </span>
            <div>
              <div className="text-sm text-muted-foreground">Sua meta</div>
              <div className="text-xl font-semibold text-foreground">Chegar em {meta}%</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso atual</span>
              <span className="text-4xl font-semibold text-foreground">{atual}%</span>
            </div>
            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all"
                style={{ width: `${atual}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="text-primary font-medium">Meta: {meta}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Faltam <strong>{meta - atual}%</strong> para sua meta. Mantendo a rotina desta semana,
              você chega lá em cerca de <strong>3 semanas</strong>.
            </p>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
