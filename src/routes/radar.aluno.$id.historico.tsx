import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronLeft } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos } from "@/lib/portal-data";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Intervencao = { data: string; descricao: string; concluido: boolean };

export const Route = createFileRoute("/radar/aluno/$id/historico")({
  head: () => ({
    meta: [
      { title: "Histórico do aluno — Portal Atlas" },
      { name: "description", content: "Linha do tempo de intervenções pedagógicas do aluno." },
      { property: "og:title", content: "Histórico do aluno" },
      { property: "og:description", content: "Linha do tempo de intervenções pedagógicas." },
    ],
  }),
  loader: ({ params }) => {
    const aluno = alunos.find((a) => a.id === params.id);
    if (!aluno) throw notFound();
    return aluno as (typeof alunos)[number];
  },
  component: HistoricoPage,
});

function HistoricoPage() {
  const aluno = Route.useLoaderData() as import("@/lib/portal-data").Aluno;
  const [extras] = useLocalStorage<Intervencao[]>(`atlas_coordenador_intervencoes_${aluno.id}`, []);
  const combined = [...aluno.historico, ...extras];
  const items = combined.length
    ? combined
    : [{ data: "—", descricao: "Sem registros ainda", concluido: false }];

  return (
    <PortalShell variant="coordenador">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <Link
          to="/radar/aluno/$id"
          params={{ id: aluno.id }}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar ao perfil
        </Link>

        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Histórico</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
            {aluno.nome}
          </h1>
          <p className="text-sm text-muted-foreground">Linha do tempo de intervenções</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <ol className="relative border-l-2 border-border ml-3 space-y-6">
            {items.map((it, i) => (
              <li key={i} className="pl-6 relative">
                <span
                  className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-background ${
                    it.concluido ? "bg-success" : "bg-muted-foreground/40"
                  } grid place-items-center`}
                >
                  {it.concluido && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground">{it.data}</span>
                  {it.concluido && (
                    <span className="text-[10px] uppercase font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                      Concluído
                    </span>
                  )}
                </div>
                <p className="text-foreground mt-1">{it.descricao}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PortalShell>
  );
}
