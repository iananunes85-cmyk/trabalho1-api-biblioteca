const emprestimosRepository = require("../repositories/emprestimos.repository");

// Listar empréstimos
async function listarEmprestimos(req, res, next) {
  try {
    const emprestimos =
      await emprestimosRepository.listarEmprestimos();

    const resultado = emprestimos.map(emprestimo => ({
      id: emprestimo.id,
      livroId: emprestimo.livroId,
      livro: emprestimo.livro.titulo,
      estudanteId: emprestimo.estudanteId,
      estudante: emprestimo.estudante.nome,
      dataEmprestimo: emprestimo.dataEmprestimo
    }));

    res.status(200).json(resultado);
  } catch (erro) {
    next(erro);
  }
}


// Buscar empréstimo por ID
async function buscarEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Empréstimo com id ${id} não encontrado`
        }
      });
    }

    res.status(200).json({
      id: emprestimo.id,
      livroId: emprestimo.livroId,
      livro: emprestimo.livro.titulo,
      estudanteId: emprestimo.estudanteId,
      estudante: emprestimo.estudante.nome,
      dataEmprestimo: emprestimo.dataEmprestimo
    });
  } catch (erro) {
    next(erro);
  }
}


// Criar empréstimo
async function criarEmprestimo(req, res, next) {
  try {
    const livroId = Number(req.body.livroId);
    const estudanteId = Number(req.body.estudanteId);
    const { dataEmprestimo } = req.body;

    const novoEmprestimo =
      await emprestimosRepository.criarEmprestimo({
        livroId,
        estudanteId,
        dataEmprestimo
      });

    res.status(201).json({
      id: novoEmprestimo.id,
      livroId: novoEmprestimo.livroId,
      livro: novoEmprestimo.livro.titulo,
      estudanteId: novoEmprestimo.estudanteId,
      estudante: novoEmprestimo.estudante.nome,
      dataEmprestimo: novoEmprestimo.dataEmprestimo
    });
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "LIVRO_NAO_ENCONTRADO",
          mensagem: "Livro não encontrado."
        }
      });
    }

    if (erro.codigo === "ESTUDANTE_NAO_ENCONTRADO") {
      return res.status(404).json({
        erro: {
          codigo: "ESTUDANTE_NAO_ENCONTRADO",
          mensagem: "Estudante não encontrado."
        }
      });
    }

    if (erro.codigo === "LIVRO_SEM_EXEMPLARES") {
      return res.status(409).json({
        erro: {
          codigo: "LIVRO_SEM_EXEMPLARES",
          mensagem: "Não há exemplares disponíveis para empréstimo."
        }
      });
    }

    next(erro);
  }
}


// Atualizar empréstimo
async function atualizarEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Empréstimo com id ${id} não encontrado`
        }
      });
    }

    const livroId = Number(req.body.livroId);
    const estudanteId = Number(req.body.estudanteId);

    const livro =
      await emprestimosRepository.buscarLivroPorId(livroId);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "LIVRO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${livroId} não encontrado`
        }
      });
    }

    const estudante =
      await emprestimosRepository.buscarEstudantePorId(estudanteId);

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "ESTUDANTE_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${estudanteId} não encontrado`
        }
      });
    }

    const atualizado =
      await emprestimosRepository.atualizarEmprestimo(
        id,
        {
          livroId,
          estudanteId,
          dataEmprestimo: req.body.dataEmprestimo
        }
      );

    res.status(200).json({
      id: atualizado.id,
      livroId: atualizado.livroId,
      livro: atualizado.livro.titulo,
      estudanteId: atualizado.estudanteId,
      estudante: atualizado.estudante.nome,
      dataEmprestimo: atualizado.dataEmprestimo
    });
  } catch (erro) {
    next(erro);
  }
}


// Atualizar parcialmente empréstimo
async function atualizarParcialmenteEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Empréstimo com id ${id} não encontrado`
        }
      });
    }

    const camposPermitidos = [
      "livroId",
      "estudanteId",
      "dataEmprestimo"
    ];

    const camposInformados = Object.keys(req.body)
      .filter(campo => camposPermitidos.includes(campo));

    if (camposInformados.length === 0) {
      return res.status(400).json({
        erro: {
          codigo: "DADOS_INVALIDOS",
          mensagem: "Nenhum campo válido foi informado."
        }
      });
    }

    if (req.body.livroId !== undefined) {
      const livro =
        await emprestimosRepository.buscarLivroPorId(
          Number(req.body.livroId)
        );

      if (!livro) {
        return res.status(404).json({
          erro: {
            codigo: "LIVRO_NAO_ENCONTRADO",
            mensagem: `Livro com id ${req.body.livroId} não encontrado`
          }
        });
      }
    }

    if (req.body.estudanteId !== undefined) {
      const estudante =
        await emprestimosRepository.buscarEstudantePorId(
          Number(req.body.estudanteId)
        );

      if (!estudante) {
        return res.status(404).json({
          erro: {
            codigo: "ESTUDANTE_NAO_ENCONTRADO",
            mensagem: `Estudante com id ${req.body.estudanteId} não encontrado`
          }
        });
      }
    }

    const atualizado =
      await emprestimosRepository.atualizarParcialmenteEmprestimo(
        id,
        req.body
      );

    res.status(200).json({
      id: atualizado.id,
      livroId: atualizado.livroId,
      livro: atualizado.livro.titulo,
      estudanteId: atualizado.estudanteId,
      estudante: atualizado.estudante.nome,
      dataEmprestimo: atualizado.dataEmprestimo
    });
  } catch (erro) {
    next(erro);
  }
}


// Excluir empréstimo
async function excluirEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id);

    const emprestimo =
      await emprestimosRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Empréstimo com id ${id} não encontrado`
        }
      });
    }

    await emprestimosRepository.excluirEmprestimo(id);

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}


// Listar empréstimos de um estudante
async function listarEmprestimosDoEstudante(req, res, next) {
  try {
    const estudanteId = Number(req.params.id);

    const estudante =
      await emprestimosRepository.buscarEstudantePorId(
        estudanteId
      );

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "ESTUDANTE_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${estudanteId} não encontrado`
        }
      });
    }

    const emprestimos =
      await emprestimosRepository.listarEmprestimosDoEstudante(
        estudanteId
      );

    const resultado = emprestimos.map(emprestimo => ({
      id: emprestimo.id,
      livroId: emprestimo.livroId,
      livro: emprestimo.livro.titulo,
      estudanteId: emprestimo.estudanteId,
      estudante: emprestimo.estudante.nome,
      dataEmprestimo: emprestimo.dataEmprestimo
    }));

    res.status(200).json(resultado);
  } catch (erro) {
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