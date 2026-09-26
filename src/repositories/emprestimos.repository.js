const prisma = require("../database/prisma");

// Listar empréstimos
async function listarEmprestimos() {
  return prisma.emprestimo.findMany({
    orderBy: {
      id: "asc"
    },
    include: {
      livro: true,
      estudante: true
    }
  });
}

// Buscar empréstimo por ID
async function buscarEmprestimoPorId(id) {
  return prisma.emprestimo.findUnique({
    where: {
      id
    },
    include: {
      livro: true,
      estudante: true
    }
  });
}

// Buscar livro por ID
async function buscarLivroPorId(id) {
  return prisma.livro.findUnique({
    where: {
      id
    }
  });
}

// Buscar estudante por ID
async function buscarEstudantePorId(id) {
  return prisma.estudante.findUnique({
    where: {
      id
    }
  });
}

// Criar empréstimo com transação
async function criarEmprestimo({
  livroId,
  estudanteId,
  dataEmprestimo
}) {
  return prisma.$transaction(async (tx) => {
    const emprestimo = await tx.emprestimo.create({
      data: {
        livroId,
        estudanteId,
        ...(dataEmprestimo
          ? {
              dataEmprestimo: new Date(dataEmprestimo)
            }
          : {})
      },
      include: {
        livro: true,
        estudante: true
      }
    });

    await tx.livro.update({
      where: {
        id: livroId
      },
      data: {
        exemplaresDisponiveis: {
          decrement: 1
        }
      }
    });

    return emprestimo;
  });
}

// Atualizar empréstimo
async function atualizarEmprestimo(
  id,
  {
    livroId,
    estudanteId,
    dataEmprestimo
  }
) {
  return prisma.emprestimo.update({
    where: {
      id
    },
    data: {
      livroId,
      estudanteId,
      ...(dataEmprestimo
        ? {
            dataEmprestimo: new Date(dataEmprestimo)
          }
        : {})
    },
    include: {
      livro: true,
      estudante: true
    }
  });
}

// Atualização parcial
async function atualizarParcialmenteEmprestimo(
  id,
  dados
) {
  const data = {};

  if (dados.livroId !== undefined) {
    data.livroId = Number(dados.livroId);
  }

  if (dados.estudanteId !== undefined) {
    data.estudanteId = Number(dados.estudanteId);
  }

  if (dados.dataEmprestimo !== undefined) {
    data.dataEmprestimo =
      new Date(dados.dataEmprestimo);
  }

  return prisma.emprestimo.update({
    where: {
      id
    },
    data,
    include: {
      livro: true,
      estudante: true
    }
  });
}

// Excluir empréstimo
async function excluirEmprestimo(id) {
  return prisma.emprestimo.delete({
    where: {
      id
    }
  });
}

// Listar empréstimos de um estudante
async function listarEmprestimosDoEstudante(
  estudanteId
) {
  return prisma.emprestimo.findMany({
    where: {
      estudanteId
    },
    orderBy: {
      id: "asc"
    },
    include: {
      livro: true,
      estudante: true
    }
  });
}

module.exports = {
  listarEmprestimos,
  buscarEmprestimoPorId,
  buscarLivroPorId,
  buscarEstudantePorId,
  criarEmprestimo,
  atualizarEmprestimo,
  atualizarParcialmenteEmprestimo,
  excluirEmprestimo,
  listarEmprestimosDoEstudante
};