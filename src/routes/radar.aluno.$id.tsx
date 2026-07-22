import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDown, Check, ChevronLeft, ClipboardList } from "lucide-react";
import { useState } from "react";
import { PortalShell } from "@/components/portal/Sidebar";
import { alunos } from "@/lib/portal-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "sonner";

export type Intervencao = { data: string; descricao: string; concluido: boolean };

export const Route = createFileRoute("/radar/aluno/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Perfil do aluno — Portal Atlas` },
      { name: "description", content: `Perfil pedagógico do aluno ${params.id}.` },
      { property: "og:title", content: "Perfil do aluno" },
      { property: "og:description", content: "Índice pedagógico, motivos e sugestões da IA." },
    ],
  }),
  loader: ({ params }) => {
    const aluno = alunos.find((a) => a.id === params.id);
    if (!aluno) throw notFound();
    return aluno as (typeof alunos)[number];
  },
  component: AlunoPage,
});

function AlunoPage() {
  const aluno = Route.useLoaderData() as import("@/lib/portal-data").Aluno;
  const [nota, setNota] = useState("");
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>(
    `atlas_coordenador_sugestoes_${aluno.id}`,
    {},
  );
  const [, setExtras] = useLocalStorage<Intervencao[]>(
    `atlas_coordenador_intervencoes_${aluno.id}`,
    [],
  );

  return (
    <PortalShell variant="coordenador">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <Link
          to="/radar/pedagogico"
          className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar ao Radar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary grid place-items-center text-lg font-semibold">
                  {aluno.nome
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">{aluno.nome}</h1>
                  <p className="text-sm text-muted-foreground">{aluno.turma}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Link
                    to="/radar/aluno/$id/historico"
                    params={{ id: aluno.id }}
                    className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
                  >
                    Ver histórico
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Índice Pedagógico</div>
                  <div className="text-3xl font-semibold text-foreground">{aluno.risco}%</div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${
                      aluno.risco >= 80
                        ? "bg-danger"
                        : aluno.risco >= 60
                          ? "bg-warning"
                          : "bg-success"
                    }`}
                    style={{ width: `${aluno.risco}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <h2 className="font-semibold text-foreground mb-4">Motivos</h2>
              <ul className="space-y-3">
                {aluno.motivos.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="h-8 w-8 rounded-lg bg-danger/10 text-danger grid place-items-center">
                      <ArrowDown className="h-4 w-4" />
                    </span>
                    <span className="text-foreground">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                  IA
                </span>
                <h2 className="font-semibold text-foreground">Sugestões da IA</h2>
              </div>
              <ul className="space-y-2">
                {aluno.sugestoes.map((s, i) => {
                  const key = `s-${i}`;
                  const on = checks[key];
                  return (
                    <li key={i}>
                      <button
                        onClick={() => setChecks((p) => ({ ...p, [key]: !p[key] }))}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left ${
                          on
                            ? "bg-primary/5 border-primary/40"
                            : "border-border hover:border-primary/30 hover:bg-muted/40"
                        }`}
                      >
                        <span
                          className={`h-6 w-6 rounded-md grid place-items-center border ${
                            on
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {on && <Check className="h-4 w-4" />}
                        </span>
                        <span className="text-sm text-foreground">{s}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Registrar Intervenção</h2>
              </div>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Descreva a ação realizada com o aluno..."
                rows={6}
                className="w-full p-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={() => {
                  const now = new Date();
                  const data = `${String(now.getDate()).padStart(2, "0")}/${String(
                    now.getMonth() + 1,
                  ).padStart(2, "0")}`;
                  setExtras((prev) => [...prev, { data, descricao: nota.trim(), concluido: true }]);
                  toast.success("Intervenção registrada com sucesso");
                  setNota("");
                }}
                disabled={!nota.trim()}
                className="mt-3 w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
