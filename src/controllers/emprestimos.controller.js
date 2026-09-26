const emprestimosService = require("../services/emprestimos.service");

function formatarEmprestimo(emprestimo) {
  return {
    id: emprestimo.id,
    livroId: emprestimo.livroId,
    livro: emprestimo.livro,
    estudanteId: emprestimo.estudanteId,
    estudante: emprestimo.estudante,
    dataEmprestimo: emprestimo.dataEmprestimo,
    created_at: emprestimo.created_at,
    updated_at: emprestimo.updated_at
  };
}

async function listarEmprestimos(req, res, next) {
  try {
    const emprestimos =
      await emprestimosService.listarEmprestimos();

    res.status(200).json(
      emprestimos.map(formatarEmprestimo)
    );
  } catch (erro) {
    next(erro);
  }
}

async function buscarEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosService.buscarEmprestimoPorId(id);

    res.status(200).json(
      formatarEmprestimo(emprestimo)
    );
  } catch (erro) {
    if (erro.codigo === "EMPRESTIMO_NAO_ENCONTRADO") {
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

async function criarEmprestimo(req, res, next) {
  try {
    const {
      livroId,
      estudanteId,
      dataEmprestimo
    } = req.body;

    const emprestimo =
      await emprestimosService.criarEmprestimo({
        livroId: Number(livroId),
        estudanteId: Number(estudanteId),
        dataEmprestimo
      });

    res.status(201).json(
      formatarEmprestimo(emprestimo)
    );
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "LIVRO_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "ESTUDANTE_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    if (erro.codigo === "LIVRO_SEM_EXEMPLARES") {
      return res.status(409).json({
        erro: {
          codigo: "LIVRO_SEM_EXEMPLARES",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

async function atualizarEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosService.atualizarEmprestimo(
        id,
        req.body
      );

    res.status(200).json(
      formatarEmprestimo(emprestimo)
    );
  } catch (erro) {
    if (erro.codigo === "EMPRESTIMO_NAO_ENCONTRADO") {
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

async function atualizarParcialmenteEmprestimo(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosService.atualizarParcialmenteEmprestimo(
        id,
        req.body
      );

    res.status(200).json(
      formatarEmprestimo(emprestimo)
    );
  } catch (erro) {
    if (erro.codigo === "EMPRESTIMO_NAO_ENCONTRADO") {
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

async function excluirEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    await emprestimosService.excluirEmprestimo(id);

    res.status(204).send();
  } catch (erro) {
    if (erro.codigo === "EMPRESTIMO_NAO_ENCONTRADO") {
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

async function listarEmprestimosDoEstudante(
  req,
  res,
  next
) {
  try {
    const estudanteId = Number(req.params.id);

    const emprestimos =
      await emprestimosService.listarEmprestimosDoEstudante(
        estudanteId
      );

    res.status(200).json(
      emprestimos.map(formatarEmprestimo)
    );
  } catch (erro) {
    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "ESTUDANTE_NAO_ENCONTRADO",
          mensagem: erro.message
        }
      });
    }

    next(erro);
  }
}

module.exports = {
  listarEmprestimos,
  buscarEmprestimo,
  criarEmprestimo,
  atualizarEmprestimo,
  atualizarParcialmenteEmprestimo,
  excluirEmprestimo,
  listarEmprestimosDoEstudante
};