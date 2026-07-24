import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";

export const Route = createFileRoute("/tutor/provas")({
  head: () => ({
    meta: [
      { title: "Revisar Provas — Radar Alfa" },
      { name: "description", content: "Lista de avaliações e provas recentes." },
      { property: "og:title", content: "Revisar Provas" },
      { property: "og:description", content: "Revisão de avaliações do aluno." },
    ],
  }),
  component: ProvasPage,
});

const provasMock = [
  { materia: "Matemática", nota: 7.2, data: "18/07", status: "Revisada" },
  { materia: "Português", nota: 9.0, data: "15/07", status: "Revisada" },
  { materia: "Ciências", nota: 7.8, data: "10/07", status: "Revisada" },
  { materia: "História", nota: 8.3, data: "05/07", status: "Revisada" },
];

function ProvasPage() {
  return (
    <PortalShell variant="aluno">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Estudos</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Revisar Provas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Veja o feedback e a correção das suas últimas avaliações.
        </p>

        <div className="mt-6 space-y-3">
          {provasMock.map((p, i) => {
            const isRecup = p.nota < 7.5;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 shadow-soft flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{p.materia}</div>
                    <div className="text-xs text-muted-foreground">Realizada em {p.data}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">
                      Nota: {p.nota.toFixed(1)}
                    </div>
                    <div className={`text-xs ${isRecup ? "text-warning" : "text-success"}`}>
                      {p.status}
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition font-medium">
                    Ver correção
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
