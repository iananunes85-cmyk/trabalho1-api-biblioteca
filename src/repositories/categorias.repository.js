const prisma = require("../database/prisma");

// Listar categorias
async function listarCategorias() {
  return prisma.categoria.findMany({
    orderBy: {
      id: "asc"
    }
  });
}


// Buscar categoria por ID
async function buscarCategoriaPorId(id) {
  return prisma.categoria.findUnique({
    where: {
      id
    }
  });
}


// Buscar categoria por nome
async function buscarCategoriaPorNome(nome) {
  return prisma.categoria.findUnique({
    where: {
      nome
    }
  });
}


// Criar categoria
async function criarCategoria(dados) {
  return prisma.categoria.create({
    data: {
      nome: dados.nome
    }
  });
}


// Atualizar categoria
async function atualizarCategoria(id, dados) {
  return prisma.categoria.update({
    where: {
      id
    },
    data: {
      nome: dados.nome
    }
  });
}


// Atualização parcial
async function atualizarParcialmenteCategoria(id, dados) {
  const camposPermitidos = ["nome"];

  const data = {};

  for (const campo of camposPermitidos) {
    if (dados[campo] !== undefined) {
      data[campo] = dados[campo];
    }
  }

  return prisma.categoria.update({
    where: {
      id
    },
    data
  });
}


// Excluir categoria
async function excluirCategoria(id) {
  return prisma.categoria.delete({
    where: {
      id
    }
  });
}


// Buscar categoria com os livros relacionados
async function buscarCategoriaComLivros(id) {
  return prisma.categoria.findUnique({
    where: {
      id
    },
    include: {
      livros: {
        include: {
          livro: true
        }
      }
    }
  });
}


module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  buscarCategoriaPorNome,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialmenteCategoria,
  excluirCategoria,
  buscarCategoriaComLivros
};