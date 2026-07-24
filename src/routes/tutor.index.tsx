// impeccable-disable clipped-overflow-container
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, BarChart3, FileText, Target, Send, Trash2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { PortalShell } from "@/components/portal/Sidebar";
import { Link } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/tutor/")({
  head: () => ({
    meta: [
      { title: "Tutor Inteligente — Radar Alfa" },
      { name: "description", content: "Converse com o Tutor Inteligente e organize seus estudos." },
      { property: "og:title", content: "Tutor Inteligente" },
      {
        property: "og:description",
        content: "Assistente conversacional integrado à vida escolar.",
      },
    ],
  }),
  component: TutorPage,
});

const ALUNO_NOME = "Pedro";

type Msg = { role: "user" | "bot"; text: string };

function mockResposta(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("estudar hoje") || t.includes("hoje"))
    return "Hoje você tem: 20 minutos de Matemática (frações) e uma videoaula de Ciências. Quer começar por Matemática?";
  if (t.includes("cronograma") || t.includes("plano"))
    return "Montei um cronograma equilibrado para a semana com foco em Matemática (sua maior dificuldade). Veja em ‘Meu Plano’.";
  if (t.includes("matemática") || t.includes("matematica"))
    return "Para melhorar em Matemática, sugiro revisar frações e equações de 1º grau — 15 minutos por dia já fazem diferença.";
  if (t.includes("prova"))
    return "Sua prova é de História, capítulo 4. Vamos revisar os tópicos principais em blocos de 25 minutos?";
  if (t.includes("dificuldade"))
    return "Seus dados mostram maior dificuldade em Matemática (72%) e Geografia (81%). Posso montar um reforço?";
  return "Entendi! Posso te ajudar com plano de estudos, dúvidas de conteúdo ou revisão para provas. O que prefere?";
}

function TutorPage() {
  const [messages, setMessages] = useLocalStorage<Msg[]>("atlas_aluno_pedro_chat", []);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: mockResposta(q) }]);
    }, 500);
  };

  const shortcuts = [
    { icon: BookOpen, label: "Meu Plano", to: "/tutor/plano" as const },
    { icon: BarChart3, label: "Meu Desempenho", to: "/tutor/desempenho" as const },
    { icon: FileText, label: "Revisar Provas", to: "/tutor/provas" as const },
    { icon: Target, label: "Minha Meta", to: "/tutor/meta" as const },
  ];

  const sugestoes = [
    "O que preciso estudar hoje?",
    "Monte meu cronograma.",
    "Como melhorar em Matemática?",
    "Tenho prova amanhã.",
  ];

  return (
    <PortalShell variant="aluno">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 min-h-screen flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Olá, {ALUNO_NOME} <span className="inline-block">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">Como posso ajudar hoje?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="group relative overflow-hidden bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-card hover:border-primary/50 hover:bg-primary/[0.01] transition duration-300 flex flex-col justify-between min-h-[100px]"
            >
              <div className="relative z-10 text-left">
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{s.label}</div>
                <div className="text-[11px] text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors duration-300">Acessar</div>
              </div>
              <div className="absolute right-[-10px] bottom-[-10px] text-primary opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
                <s.icon className="h-16 w-16" />
              </div>
            </Link>
          ))}
        </div>

        {messages.length > 0 && (
          <div className="flex flex-col flex-1 bg-card border border-border rounded-2xl shadow-soft mb-4 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="text-xs font-semibold text-foreground tracking-tight">
                Histórico de conversa
              </span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Limpar conversa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar conversa</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja realmente limpar toda a conversa? Essa ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => setMessages([])}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Limpar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[45vh]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center mb-4 mt-2">
          {sugestoes.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:text-primary transition text-muted-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="bg-card border border-border rounded-2xl p-2 shadow-card flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua dúvida..."
            className="flex-1 px-3 py-2.5 bg-transparent text-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90 disabled:opacity-40 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
