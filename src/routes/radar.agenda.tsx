import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";

export const Route = createFileRoute("/radar/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Radar Alfa" },
      { name: "description", content: "Agenda da coordenação: reuniões e compromissos." },
      { property: "og:title", content: "Agenda" },
      { property: "og:description", content: "Próximos compromissos." },
    ],
  }),
  component: AgendaPage,
});

const compromissos = [
  {
    data: "Seg, 22/07",
    hora: "09:00",
    titulo: "Reunião com família — João Pedro",
    local: "Sala 3",
  },
  { data: "Ter, 23/07", hora: "14:00", titulo: "Conselho de classe — 8º Ano", local: "Auditório" },
  { data: "Qua, 24/07", hora: "10:30", titulo: "Mentoria — Lucas Almeida", local: "Sala 5" },
  {
    data: "Qui, 25/07",
    hora: "16:00",
    titulo: "Feedback de professores",
    local: "Sala dos professores",
  },
  { data: "Sex, 26/07", hora: "08:30", titulo: "Acompanhamento — Maria Clara", local: "Sala 3" },
];

function AgendaPage() {
  return (
    <PortalShell variant="coordenador">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Semana</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Agenda
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Seus próximos compromissos.</p>

        <div className="mt-6 space-y-3">
          {compromissos.map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-4 shadow-soft flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{c.titulo}</div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {c.data} · {c.hora}
                  </span>
                  <span>· {c.local}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
