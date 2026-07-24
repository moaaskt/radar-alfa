// impeccable-disable clipped-overflow-container
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, UserCog, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Radar Alfa" },
      { name: "description", content: "Acesse sua conta no Radar Alfa." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const [profile, setProfile] = useState<"aluno" | "coordenador">("aluno");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f7] dark:bg-zinc-950 px-4 py-16">
      {/* Radar Alfa Logo centered above the card */}
      <div className="mb-6 px-4">
        <img
          src="/logo_radar_alfa_v1.png"
          alt="Logo Radar Alfa"
          className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto mx-auto"
        />
      </div>

      {/* Floating Card exactly like Plurall Login */}
      <div className="w-full max-w-[420px] bg-card border border-border rounded-3xl p-8 shadow-lg flex flex-col">
        
        {/* Login / Cadastro Tabs */}
        <div className="flex border-b border-border mb-6 text-sm font-semibold">
          <div className="border-b-4 border-primary text-primary pb-3 px-2 cursor-pointer">
            Login
          </div>
          <div className="text-muted-foreground pb-3 px-6 cursor-pointer hover:text-foreground transition">
            Cadastro
          </div>
        </div>

        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-foreground">Radar Alfa</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Preencha seus dados de acesso para entrar
          </p>
        </div>

        {/* Profile selectors styled as input fields */}
        <div className="space-y-4">
          {/* Simulated Input 1: Aluno */}
          <button
            onClick={() => setProfile("aluno")}
            className={`w-full h-14 rounded-xl border transition-all duration-200 flex items-center px-4 text-left bg-[#f8f9fc] dark:bg-zinc-900 ${
              profile === "aluno"
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Perfil de Acesso</div>
              <div className="text-sm font-medium text-foreground mt-0.5">Aluno (Tutor Inteligente)</div>
            </div>
            <div className={`h-5 w-5 rounded-full border grid place-items-center ${
              profile === "aluno"
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border"
            }`}>
              {profile === "aluno" && <Check className="h-3 w-3" />}
            </div>
          </button>

          {/* Simulated Input 2: Coordenador */}
          <button
            onClick={() => setProfile("coordenador")}
            className={`w-full h-14 rounded-xl border transition-all duration-200 flex items-center px-4 text-left bg-[#f8f9fc] dark:bg-zinc-900 ${
              profile === "coordenador"
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Perfil de Acesso</div>
              <div className="text-sm font-medium text-foreground mt-0.5">Coordenador (Radar Pedagógico)</div>
            </div>
            <div className={`h-5 w-5 rounded-full border grid place-items-center ${
              profile === "coordenador"
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border"
            }`}>
              {profile === "coordenador" && <Check className="h-3 w-3" />}
            </div>
          </button>
        </div>

        {/* Mock Forgot Password link */}
        <div className="text-right mt-3">
          <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">
            Esqueci minha senha
          </span>
        </div>

        {/* Primary Action Button: Entrar */}
        <Link
          to={profile === "aluno" ? "/tutor" : "/radar"}
          className="w-full py-3.5 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-center text-sm shadow-md transition duration-200 mt-8 block"
        >
          Entrar
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Protótipo navegável — dados de demonstração
      </p>
    </div>
  );
}
