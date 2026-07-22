// impeccable-disable clipped-overflow-container
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
          className="group relative overflow-hidden bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:border-primary/50 hover:bg-primary/[0.01] transition duration-300 min-h-[170px] flex flex-col justify-between"
        >
          <div className="relative z-10 text-left">
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Entrar como Coordenador</h2>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
              Acesse o Radar Pedagógico Inteligente e acompanhe os alunos prioritários.
            </p>
          </div>
          <div className="absolute right-[-15px] bottom-[-15px] text-primary opacity-[0.05] group-hover:opacity-[0.09] group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
            <UserCog className="h-24 w-24" />
          </div>
        </Link>
        <Link
          to="/tutor"
          className="group relative overflow-hidden bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:border-primary/50 hover:bg-primary/[0.01] transition duration-300 min-h-[170px] flex flex-col justify-between"
        >
          <div className="relative z-10 text-left">
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Entrar como Aluno</h2>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
              Converse com o Tutor Inteligente, veja seu plano, desempenho e meta.
            </p>
          </div>
          <div className="absolute right-[-15px] bottom-[-15px] text-primary opacity-[0.05] group-hover:opacity-[0.09] group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
            <GraduationCap className="h-24 w-24" />
          </div>
        </Link>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">
        Protótipo navegável — dados de demonstração
      </p>
    </div>
  );
}
