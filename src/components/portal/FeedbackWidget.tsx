import { useState, useEffect } from "react";
import { Smile, Check, Sparkles } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";

type Feeling = {
  emoji: string;
  label: string;
};

const feelings: Feeling[] = [
  { emoji: "😠", label: "Odiei" },
  { emoji: "🙁", label: "Ruim" },
  { emoji: "😐", label: "Neutra" },
  { emoji: "🙂", label: "Gostei" },
  { emoji: "😍", label: "Amei" },
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Feeling | null>(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Get current route path using useRouterState hook
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Reset widget state when closed
  useEffect(() => {
    if (!isOpen) {
      setSelected(null);
      setComment("");
      setErrorMsg("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selected) return;
    setIsLoading(true);
    setErrorMsg("");

    const isCoordenador = pathname.startsWith("/radar");
    const isAluno = pathname.startsWith("/tutor");
    const perfil = isAluno ? "Aluno" : isCoordenador ? "Coordenador" : "Visitante";

    try {
      const response = await fetch("https://formspree.io/f/mgoglnrw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sentimento: selected.label,
          comentario: comment.trim(),
          pagina: pathname,
          perfil: perfil,
          data: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha no envio do feedback");
      }

      setIsOpen(false);
      // Fire success notification after modal close
      setTimeout(() => {
        toast.success("Obrigado! Seu feedback foi enviado com sucesso.");
      }, 100);
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      setErrorMsg("Não foi possível enviar, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname !== "/") return null;

  return (
    <>
      {/* Floating vertical tab button on the right edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-[55%] -translate-y-1/2 z-[40] flex flex-col items-center justify-center gap-1.5 py-4 px-2 bg-primary-soft hover:bg-primary/20 text-primary border-y border-l border-primary/20 rounded-l-2xl shadow-md transition duration-200 select-none group"
      >
        <span className="[writing-mode:vertical-lr] rotate-180 font-bold text-[11px] tracking-widest uppercase">
          Feedback
        </span>
        <Smile className="h-4.5 w-4.5 mt-0.5 group-hover:scale-110 transition duration-200" />
      </button>

      {/* Popover / Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/45 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop closer */}
          <div className="absolute inset-0" onClick={() => !isLoading && setIsOpen(false)} />

          {/* Modal Card */}
          <div className="relative bg-card border border-border rounded-3xl p-6 shadow-xl w-full max-w-[360px] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-center font-bold text-base text-foreground leading-tight px-2">
              O que você está achando do Radar Alfa?
            </h3>

            {/* Emojis Line */}
            <div className="flex items-center justify-between px-2 mt-5">
              {feelings.map((f) => {
                const isSelected = selected?.label === f.label;
                return (
                  <button
                    key={f.label}
                    onClick={() => setSelected(f)}
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-2xl transition duration-200 ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm scale-110"
                        : "bg-primary-soft hover:bg-primary/20 text-foreground"
                    }`}
                  >
                    {f.emoji}
                  </button>
                );
              })}
            </div>

            {/* Selected Feeling Text */}
            {selected && (
              <div className="text-center text-xs font-bold text-primary mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {selected.label}
              </div>
            )}

            {/* Feedback Commentary Textarea */}
            {selected && (
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deixe o seu comentário"
                rows={3}
                disabled={isLoading}
                className="w-full mt-4 p-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring animate-in fade-in duration-300"
              />
            )}

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs text-destructive text-center mt-3 animate-in fade-in duration-200">
                {errorMsg}
              </p>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-full transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selected || isLoading}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition duration-200 flex items-center gap-1.5 ${
                  selected && !isLoading
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
