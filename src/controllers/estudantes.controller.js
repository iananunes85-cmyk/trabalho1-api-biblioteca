const estudantesService = require("../services/estudantes.service");

async function listarEstudantes(req, res, next) {
  try {
    const estudantes =
      await estudantesService.listarEstudantes();

    res.status(200).json(estudantes);
  } catch (erro) {
    next(erro);
  }
}

async function buscarEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    const estudante =
      await estudantesService.buscarEstudantePorId(id);

    res.status(200).json(estudante);
  } catch (erro) {
    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

async function criarEstudante(req, res, next) {
  try {
    const novoEstudante =
      await estudantesService.criarEstudante(req.body);

    res.status(201).json(novoEstudante);
  } catch (erro) {
    if (erro.codigo === "EMAIL_DUPLICADO") {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

async function atualizarEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    const estudanteAtualizado =
      await estudantesService.atualizarEstudante(
        id,
        req.body
      );

    res.status(200).json(estudanteAtualizado);
  } catch (erro) {
    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    if (erro.codigo === "EMAIL_DUPLICADO") {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

async function atualizarParcialmenteEstudante(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const camposPermitidos = ["nome", "email"];

    const camposInformados = Object.keys(req.body)
      .filter(campo =>
        camposPermitidos.includes(campo)
      );

    if (camposInformados.length === 0) {
      return res.status(400).json({
        erro: {
          codigo: "DADOS_INVALIDOS",
          mensagem:
            "Nenhum campo válido foi informado."
        }
      });
    }

    const estudanteAtualizado =
      await estudantesService.atualizarParcialmenteEstudante(
        id,
        req.body
      );

    res.status(200).json(estudanteAtualizado);
  } catch (erro) {
    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    if (erro.codigo === "EMAIL_DUPLICADO") {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

async function excluirEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    await estudantesService.excluirEstudante(id);

    res.status(204).send();
  } catch (erro) {
    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    if (erro.code === "P2003") {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO_INTEGRIDADE",
          mensagem:
            "Não é possível excluir este estudante porque existem empréstimos relacionados a ele."
        }
      });
    }

    next(erro);
  }
}

module.exports = {
  listarEstudantes,
  buscarEstudante,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
};