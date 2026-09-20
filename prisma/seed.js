const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const path = require("path");

const adapter = new PrismaBetterSqlite3({
  url: path.join(__dirname, "..", "biblioteca.db"),
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando seed...");

  // Limpa os dados existentes
  await prisma.livroCategoria.deleteMany();
  await prisma.emprestimo.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.estudante.deleteMany();

  // =========================
  // CATEGORIAS
  // =========================

  const categorias = await Promise.all([
    prisma.categoria.create({ data: { nome: "Romance" } }),
    prisma.categoria.create({
      data: { nome: "Literatura Brasileira" },
    }),
    prisma.categoria.create({
      data: { nome: "Literatura Estrangeira" },
    }),
    prisma.categoria.create({ data: { nome: "Ficção" } }),
    prisma.categoria.create({ data: { nome: "Aventura" } }),
    prisma.categoria.create({ data: { nome: "Drama" } }),
    prisma.categoria.create({ data: { nome: "Poesia" } }),
    prisma.categoria.create({ data: { nome: "Fantasia" } }),
    prisma.categoria.create({ data: { nome: "Mistério" } }),
    prisma.categoria.create({ data: { nome: "Clássicos" } }),
  ]);

  // =========================
  // ESTUDANTES
  // =========================

  const estudantes = await Promise.all([
    prisma.estudante.create({
      data: {
        nome: "Ana Silva",
        email: "ana.silva@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Bruno Santos",
        email: "bruno.santos@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Carla Oliveira",
        email: "carla.oliveira@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Daniel Souza",
        email: "daniel.souza@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Eduarda Lima",
        email: "eduarda.lima@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Felipe Costa",
        email: "felipe.costa@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Gabriela Alves",
        email: "gabriela.alves@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Henrique Martins",
        email: "henrique.martins@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "Isabela Rocha",
        email: "isabela.rocha@email.com",
      },
    }),
    prisma.estudante.create({
      data: {
        nome: "João Pereira",
        email: "joao.pereira@email.com",
      },
    }),
  ]);

  // =========================
  // LIVROS
  // =========================

  const livros = await Promise.all([
    prisma.livro.create({
      data: {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        genero: "Romance",
        ano: 1899,
        exemplaresDisponiveis: 3,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "O Cortiço",
        autor: "Aluísio Azevedo",
        genero: "Romance",
        ano: 1890,
        exemplaresDisponiveis: 4,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "Vidas Secas",
        autor: "Graciliano Ramos",
        genero: "Drama",
        ano: 1938,
        exemplaresDisponiveis: 2,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "Capitães da Areia",
        autor: "Jorge Amado",
        genero: "Drama",
        ano: 1937,
        exemplaresDisponiveis: 3,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "A Hora da Estrela",
        autor: "Clarice Lispector",
        genero: "Drama",
        ano: 1977,
        exemplaresDisponiveis: 2,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "Grande Sertão: Veredas",
        autor: "Guimarães Rosa",
        genero: "Literatura Brasileira",
        ano: 1956,
        exemplaresDisponiveis: 2,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        genero: "Fantasia",
        ano: 1943,
        exemplaresDisponiveis: 5,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        genero: "Fantasia",
        ano: 1997,
        exemplaresDisponiveis: 4,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        genero: "Aventura",
        ano: 1937,
        exemplaresDisponiveis: 3,
      },
    }),
    prisma.livro.create({
      data: {
        titulo: "Sherlock Holmes",
        autor: "Arthur Conan Doyle",
        genero: "Mistério",
        ano: 1887,
        exemplaresDisponiveis: 2,
      },
    }),
  ]);

  // =========================
  // RELAÇÃO LIVRO x CATEGORIA
  // =========================

  const relacoes = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 5],
    [3, 1],
    [3, 5],
    [4, 1],
    [4, 5],
    [5, 1],
    [5, 9],
    [6, 7],
    [6, 2],
    [7, 7],
    [7, 2],
    [8, 4],
    [8, 7],
    [9, 8],
    [9, 9],
  ];

  await Promise.all(
    relacoes.map(([livroIndex, categoriaIndex]) =>
      prisma.livroCategoria.create({
        data: {
          livroId: livros[livroIndex].id,
          categoriaId: categorias[categoriaIndex].id,
        },
      })
    )
  );

  // =========================
  // EMPRÉSTIMOS
  // =========================

  const emprestimos = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
  ];

  await Promise.all(
    emprestimos.map(([livroIndex, estudanteIndex]) =>
      prisma.emprestimo.create({
        data: {
          livroId: livros[livroIndex].id,
          estudanteId: estudantes[estudanteIndex].id,
        },
      })
    )
  );

  console.log("Seed concluído com sucesso!");
  console.log("Categorias:", categorias.length);
  console.log("Estudantes:", estudantes.length);
  console.log("Livros:", livros.length);
  console.log("Relações Livro-Categoria:", relacoes.length);
  console.log("Empréstimos:", emprestimos.length);
}

main()
  .catch((erro) => {
    console.error("Erro durante o seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });