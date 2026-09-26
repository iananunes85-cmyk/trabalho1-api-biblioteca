const emprestimosRepository = require("../repositories/emprestimos.repository");

async function listarEmprestimos() {
  return emprestimosRepository.listarEmprestimos();
}

async function buscarEmprestimoPorId(id) {
  const emprestimo =
    await emprestimosRepository.buscarEmprestimoPorId(id);

  if (!emprestimo) {
    const erro = new Error(
      `Empréstimo com id ${id} não encontrado.`
    );
    erro.codigo = "EMPRESTIMO_NAO_ENCONTRADO";
    throw erro;
  }

  return emprestimo;
}

async function criarEmprestimo(dados) {
  const { livroId, estudanteId, dataEmprestimo } = dados;

  const livro =
    await emprestimosRepository.buscarLivroPorId(livroId);

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

  const estudante =
    await emprestimosRepository.buscarEstudantePorId(estudanteId);

  if (!estudante) {
    const erro = new Error("Estudante não encontrado.");
    erro.codigo = "ESTUDANTE_NAO_ENCONTRADO";
    throw erro;
  }

  return emprestimosRepository.criarEmprestimo({
    livroId,
    estudanteId,
    dataEmprestimo
  });
}

async function atualizarEmprestimo(id, dados) {
  await buscarEmprestimoPorId(id);

  return emprestimosRepository.atualizarEmprestimo(
    id,
    dados
  );
}

async function atualizarParcialmenteEmprestimo(id, dados) {
  await buscarEmprestimoPorId(id);

  return emprestimosRepository.atualizarParcialmenteEmprestimo(
    id,
    dados
  );
}

async function excluirEmprestimo(id) {
  await buscarEmprestimoPorId(id);

  return emprestimosRepository.excluirEmprestimo(id);
}

async function listarEmprestimosDoEstudante(estudanteId) {
  const estudante =
    await emprestimosRepository.buscarEstudantePorId(estudanteId);

  if (!estudante) {
    const erro = new Error("Estudante não encontrado.");
    erro.codigo = "ESTUDANTE_NAO_ENCONTRADO";
    throw erro;
  }

  return emprestimosRepository.listarEmprestimosDoEstudante(
    estudanteId
  );
}

module.exports = {
  listarEmprestimos,
  buscarEmprestimoPorId,
  criarEmprestimo,
  atualizarEmprestimo,
  atualizarParcialmenteEmprestimo,
  excluirEmprestimo,
  listarEmprestimosDoEstudante
};