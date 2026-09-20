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


// Verificar se livro existe
async function buscarLivroPorId(id) {
  return prisma.livro.findUnique({
    where: {
      id
    }
  });
}


// Verificar se estudante existe
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

    const livro = await tx.livro.findUnique({
      where: {
        id: livroId
      }
    });

    if (!livro) {
      const erro = new Error("Livro não encontrado.");
      erro.codigo = "LIVRO_NAO_ENCONTRADO";
      throw erro;
    }

    if (livro.exemplaresDisponiveis <= 0) {
      const erro = new Error(
        "Não há exemplares disponíveis para empréstimo."
      );
      erro.codigo = "LIVRO_SEM_EXEMPLARES";
      throw erro;
    }

    const estudante = await tx.estudante.findUnique({
      where: {
        id: estudanteId
      }
    });

    if (!estudante) {
      const erro = new Error("Estudante não encontrado.");
      erro.codigo = "ESTUDANTE_NAO_ENCONTRADO";
      throw erro;
    }

    const emprestimo = await tx.emprestimo.create({
      data: {
        livroId,
        estudanteId,
        ...(dataEmprestimo
          ? { dataEmprestimo: new Date(dataEmprestimo) }
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
        ? { dataEmprestimo: new Date(dataEmprestimo) }
        : {})
    },
    include: {
      livro: true,
      estudante: true
    }
  });
}


// Atualização parcial
async function atualizarParcialmenteEmprestimo(id, dados) {
  const data = {};

  if (dados.livroId !== undefined) {
    data.livroId = Number(dados.livroId);
  }

  if (dados.estudanteId !== undefined) {
    data.estudanteId = Number(dados.estudanteId);
  }

  if (dados.dataEmprestimo !== undefined) {
    data.dataEmprestimo = new Date(dados.dataEmprestimo);
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
async function listarEmprestimosDoEstudante(estudanteId) {
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