import { createFileRoute } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Check } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { planoSemana } from "@/lib/portal-data";

export const Route = createFileRoute("/tutor/plano")({
  head: () => ({
    meta: [
      { title: "Meu Plano — Radar Alfa" },
      { name: "description", content: "Seu plano de estudos da semana, organized por dia." },
      { property: "og:title", content: "Meu Plano da Semana" },
      { property: "og:description", content: "Cronograma semanal de estudos do aluno." },
    ],
  }),
  component: PlanoPage,
});

function PlanoPage() {
  const [state, setState] = useLocalStorage<boolean[]>(
    "atlas_aluno_pedro_plano",
    planoSemana.map((p) => p.feito),
  );

  return (
    <PortalShell variant="aluno">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Cronograma</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Plano da Semana
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {state.filter(Boolean).length} de {state.length} atividades concluídas
        </p>

        <div className="mt-6 space-y-3">
          {planoSemana.map((p, i) => {
            const done = state[i];
            return (
              <button
                key={i}
                onClick={() => setState((s) => s.map((v, idx) => (idx === i ? !v : v)))}
                className={`w-full text-left bg-card border rounded-2xl p-4 shadow-soft flex items-center gap-4 transition ${
                  done ? "border-success/40 bg-success/5" : "border-border hover:border-primary/30"
                }`}
              >
                <span
                  className={`h-7 w-7 rounded-lg grid place-items-center border-2 ${
                    done ? "bg-success border-success text-white" : "border-border"
                  }`}
                >
                  {done && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <div className="w-24 text-sm font-medium text-primary">{p.dia}</div>
                <div className="flex-1">
                  <div
                    className={`font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {p.materia}
                  </div>
                  <div className="text-xs text-muted-foreground">{p.atividade}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
