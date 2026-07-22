import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, UserCog } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Atlas — Selecionar perfil" },
      { name: "description", content: "Acesse o Portal Atlas como Coordenador ou como Aluno." },
      { property: "og:title", content: "Portal Atlas — Selecionar perfil" },
      {
        property: "og:description",
        content: "Acesse o Portal Atlas como Coordenador ou como Aluno.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-soft via-background to-background px-4 py-16">
      <div className="mb-10 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-bold text-2xl mb-4 shadow-card">
          A
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Portal Atlas
        </h1>
        <p className="mt-2 text-muted-foreground">Selecione seu perfil para entrar</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
        <Link
          to="/radar"
          className="group bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:border-primary/40 transition"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
            <UserCog className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Entrar como Coordenador</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesse o Radar Pedagógico Inteligente e acompanhe os alunos prioritários.
          </p>
        </Link>
        <Link
          to="/tutor"
          className="group bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:border-primary/40 transition"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Entrar como Aluno</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Converse com o Tutor Inteligente, veja seu plano, desempenho e meta.
          </p>
        </Link>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">
        Protótipo navegável — dados de demonstração
      </p>
    </div>
  );
}
