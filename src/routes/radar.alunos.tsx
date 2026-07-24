import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos } from "@/lib/portal-data";

export const Route = createFileRoute("/radar/alunos")({
  head: () => ({
    meta: [
      { title: "Alunos — Radar Alfa" },
      { name: "description", content: "Base completa de alunos monitorados." },
      { property: "og:title", content: "Alunos" },
      { property: "og:description", content: "Lista completa de alunos." },
    ],
  }),
  component: AlunosPage,
});

function AlunosPage() {
  return (
    <PortalShell variant="coordenador">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Base</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Alunos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Todos os alunos acompanhados pela coordenação.
        </p>

        <div className="mt-6 bg-card border border-border rounded-2xl shadow-soft divide-y divide-border">
          {alunos.map((a) => (
            <Link
              key={a.id}
              to="/radar/aluno/$id"
              params={{ id: a.id }}
              className="flex items-center gap-4 p-4 hover:bg-muted/40 transition"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">
                {a.nome.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{a.nome}</div>
                <div className="text-xs text-muted-foreground">{a.turma}</div>
              </div>
              <div className="text-xs text-muted-foreground">Risco {a.risco}</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
