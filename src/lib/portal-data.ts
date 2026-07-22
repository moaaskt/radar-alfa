export type Aluno = {
  id: string;
  nome: string;
  turma: string;
  risco: number;
  status: "alto" | "atencao" | "ok";
  motivos: string[];
  sugestoes: string[];
  historico: { data: string; descricao: string; concluido: boolean }[];
};

export const alunos: Aluno[] = [
  {
    id: "joao-pedro",
    nome: "João Pedro",
    turma: "8º Ano",
    risco: 92,
    status: "alto",
    motivos: [
      "Frequência caiu",
      "Nota de Matemática",
      "Não acessa o Plurall",
      "Família não visualizou comunicados",
    ],
    sugestoes: [
      "Agendar reunião",
      "Conversa individual",
      "Exercícios extras",
      "Encaminhar ao professor",
    ],
    historico: [
      { data: "12/05", descricao: "Conversa realizada", concluido: true },
      { data: "19/05", descricao: "Família compareceu", concluido: true },
      { data: "26/05", descricao: "Notas melhoraram", concluido: true },
    ],
  },
  {
    id: "maria-clara",
    nome: "Maria Clara",
    turma: "7º Ano",
    risco: 89,
    status: "alto",
    motivos: ["Queda em Português", "Ausências recentes"],
    sugestoes: ["Conversa individual", "Reforço de leitura"],
    historico: [
      { data: "10/05", descricao: "Reunião com responsáveis", concluido: true },
      { data: "20/05", descricao: "Plano de leitura iniciado", concluido: true },
    ],
  },
  {
    id: "lucas",
    nome: "Lucas Almeida",
    turma: "9º Ano",
    risco: 85,
    status: "alto",
    motivos: ["Baixo engajamento", "Atrasos frequentes"],
    sugestoes: ["Mentoria semanal", "Contato com família"],
    historico: [{ data: "15/05", descricao: "Mentoria iniciada", concluido: true }],
  },
  {
    id: "beatriz",
    nome: "Beatriz Souza",
    turma: "8º Ano",
    risco: 74,
    status: "atencao",
    motivos: ["Notas oscilando"],
    sugestoes: ["Acompanhamento semanal"],
    historico: [],
  },
  {
    id: "rafael",
    nome: "Rafael Lima",
    turma: "6º Ano",
    risco: 68,
    status: "atencao",
    motivos: ["Frequência caindo"],
    sugestoes: ["Contato com família"],
    historico: [],
  },
];

export const resumo = {
  alto: 8,
  atencao: 19,
  ok: 247,
};

export const planoSemana = [
  { dia: "Segunda", materia: "Matemática", atividade: "20 minutos de exercícios", feito: true },
  { dia: "Terça", materia: "Ciências", atividade: "Vídeo aula — Ecossistemas", feito: true },
  { dia: "Quarta", materia: "Português", atividade: "Exercícios de interpretação", feito: false },
  { dia: "Quinta", materia: "História", atividade: "Leitura do capítulo 4", feito: false },
  { dia: "Sexta", materia: "Matemática", atividade: "Revisão de frações", feito: false },
];

export const desempenho = [
  { materia: "Matemática", pct: 72, var: 8 },
  { materia: "Português", pct: 90, var: 2 },
  { materia: "História", pct: 83, var: 0 },
  { materia: "Ciências", pct: 78, var: 4 },
  { materia: "Geografia", pct: 81, var: -1 },
];
