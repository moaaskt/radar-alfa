import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, User } from "lucide-react";
import { PortalShell } from "@/components/portal/Sidebar";

export const Route = createFileRoute("/radar/config")({
  head: () => ({
    meta: [
      { title: "Configurações — Portal Atlas" },
      { name: "description", content: "Preferências da conta de coordenação." },
      { property: "og:title", content: "Configurações" },
      { property: "og:description", content: "Preferências e notificações." },
    ],
  }),
  component: ConfigPage,
});

function Row({
  Icon,
  title,
  desc,
  checked,
}: {
  Icon: typeof Bell;
  title: string;
  desc: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border last:border-b-0">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className={`h-6 w-11 rounded-full p-0.5 ${checked ? "bg-primary" : "bg-muted"}`}>
        <div
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </div>
    </div>
  );
}

function ConfigPage() {
  return (
    <PortalShell variant="coordenador">
      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Conta</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-1">
          Configurações
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Ajuste suas preferências.</p>

        <div className="mt-6 bg-card border border-border rounded-2xl shadow-soft">
          <Row Icon={User} title="Perfil" desc="Nome, foto e informações" checked />
          <Row Icon={Bell} title="Notificações" desc="Alertas de alunos em risco" checked />
          <Row Icon={Bell} title="Resumo semanal por e-mail" desc="Envio toda segunda-feira" />
          <Row Icon={Shield} title="Privacidade" desc="Compartilhamento com professores" checked />
        </div>
      </div>
    </PortalShell>
  );
}
