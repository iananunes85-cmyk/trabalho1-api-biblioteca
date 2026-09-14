const livros = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    genero: "romance",
    ano: 1899
  },
  {
    id: 2,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    genero: "ficcao",
    ano: 1943
  },
  {
    id: 3,
    titulo: "Quarto de Despejo",
    autor: "Carolina Maria de Jesus",
    genero: "biografia",
    ano: 1960
  }
];

const estudantes = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com"
  },
  {
    id: 2,
    nome: "João Santos",
    email: "joao@email.com"
  }
];

const emprestimos = [
  {
    id: 1,
    livroId: 1,
    estudanteId: 1,
    dataEmprestimo: "2026-09-01",
    devolvido: false
  }
];

module.exports = {
  livros,
  estudantes,
  emprestimos
};