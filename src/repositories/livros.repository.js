const prisma = require("../database/prisma");

// Listar livros com filtro, busca, ordenação e paginação
async function listarLivros({
  genero,
  busca,
  page = 1,
  limit = 10,
  ordenarPor = "id",
  ordem = "asc"
}) {
  const skip = (page - 1) * limit;

  const where = {};

  // Filtro por gênero
  if (genero) {
    where.genero = {
      equals: genero
    };
  }

  // Pesquisa por título ou autor
  if (busca) {
    where.OR = [
      {
        titulo: {
          contains: busca
        }
      },
      {
        autor: {
          contains: busca
        }
      }
    ];
  }

  // Campos permitidos para ordenação
  const camposOrdenacaoPermitidos = [
    "id",
    "titulo",
    "autor",
    "genero",
    "ano"
  ];

  const campoOrdenacao =
    camposOrdenacaoPermitidos.includes(ordenarPor)
      ? ordenarPor
      : "id";

  const direcao = ordem === "desc" ? "desc" : "asc";

  const [livros, total] = await Promise.all([
    prisma.livro.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [campoOrdenacao]: direcao
      }
    }),

    prisma.livro.count({
      where
    })
  ]);

  return {
    livros,
    total
  };
}


// Buscar livro por ID
async function buscarLivroPorId(id) {
  return prisma.livro.findUnique({
    where: {
      id
    }
  });
}


// Criar livro
async function criarLivro(dados) {
  return prisma.livro.create({
    data: {
      titulo: dados.titulo,
      autor: dados.autor,
      genero: dados.genero,
      ano: dados.ano,
      exemplaresDisponiveis:
        dados.exemplaresDisponiveis ?? 1
    }
  });
}


// Atualizar livro
async function atualizarLivro(id, dados) {
  return prisma.livro.update({
    where: {
      id
    },
    data: {
      titulo: dados.titulo,
      autor: dados.autor,
      genero: dados.genero,
      ano: dados.ano,
      exemplaresDisponiveis:
        dados.exemplaresDisponiveis
    }
  });
}


// Atualização parcial
async function atualizarParcialmenteLivro(id, dados) {
  const camposPermitidos = [
    "titulo",
    "autor",
    "genero",
    "ano",
    "exemplaresDisponiveis"
  ];

  const data = {};

  for (const campo of camposPermitidos) {
    if (dados[campo] !== undefined) {
      data[campo] = dados[campo];
    }
  }

  return prisma.livro.update({
    where: {
      id
    },
    data
  });
}


// Excluir livro
async function excluirLivro(id) {
  return prisma.livro.delete({
    where: {
      id
    }
  });
}


// Buscar livro com categorias e empréstimos
async function buscarLivroComRelacionamentos(id) {
  return prisma.livro.findUnique({
    where: {
      id
    },
    include: {
      categorias: {
        include: {
          categoria: true
        }
      },
      emprestimos: {
        include: {
          estudante: true
        }
      }
    }
  });
}


module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  atualizarParcialmenteLivro,
  excluirLivro,
  buscarLivroComRelacionamentos
};