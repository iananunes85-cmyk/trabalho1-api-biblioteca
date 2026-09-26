const estudantesRepository = require("../repositories/estudantes.repository");

async function listarEstudantes() {
  return estudantesRepository.listarEstudantes();
}

async function buscarEstudantePorId(id) {
  const estudante =
    await estudantesRepository.buscarEstudantePorId(id);

  if (!estudante) {
    const erro = new Error(
      `Estudante com id ${id} não encontrado`
    );
    erro.codigo = "ESTUDANTE_NAO_ENCONTRADO";
    throw erro;
  }

  return estudante;
}

async function criarEstudante(dados) {
  const estudanteExistente =
    await estudantesRepository.buscarEstudantePorEmail(
      dados.email
    );

  if (estudanteExistente) {
    const erro = new Error(
      "Já existe um estudante cadastrado com este e-mail."
    );
    erro.codigo = "EMAIL_DUPLICADO";
    throw erro;
  }

  return estudantesRepository.criarEstudante(dados);
}

async function atualizarEstudante(id, dados) {
  const estudante = await buscarEstudantePorId(id);

  if (
    dados.email &&
    dados.email !== estudante.email
  ) {
    const estudanteExistente =
      await estudantesRepository.buscarEstudantePorEmail(
        dados.email
      );

    if (estudanteExistente) {
      const erro = new Error(
        "Já existe um estudante cadastrado com este e-mail."
      );
      erro.codigo = "EMAIL_DUPLICADO";
      throw erro;
    }
  }

  return estudantesRepository.atualizarEstudante(
    id,
    dados
  );
}

async function atualizarParcialmenteEstudante(
  id,
  dados
) {
  const estudante = await buscarEstudantePorId(id);

  if (
    dados.email &&
    dados.email !== estudante.email
  ) {
    const estudanteExistente =
      await estudantesRepository.buscarEstudantePorEmail(
        dados.email
      );

    if (estudanteExistente) {
      const erro = new Error(
        "Já existe um estudante cadastrado com este e-mail."
      );
      erro.codigo = "EMAIL_DUPLICADO";
      throw erro;
    }
  }

  return estudantesRepository.atualizarParcialmenteEstudante(
    id,
    dados
  );
}

async function excluirEstudante(id) {
  await buscarEstudantePorId(id);

  return estudantesRepository.excluirEstudante(id);
}

module.exports = {
  listarEstudantes,
  buscarEstudantePorId,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
};