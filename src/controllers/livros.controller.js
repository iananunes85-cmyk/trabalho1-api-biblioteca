const livrosService = require("../services/livros.service");

async function listarLivros(req, res, next) {
  try {
    const { genero, busca, ordenarPor, ordem } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const resultado = await livrosService.listarLivros({
      genero,
      busca,
      page,
      limit,
      ordenarPor,
      ordem
    });

    const totalPaginas = Math.ceil(
      resultado.total / limit
    );

    res.status(200).json({
      dados: resultado.livros,
      paginacao: {
        pagina: page,
        limite: limit,
        total: resultado.total,
        totalPaginas
      }
    });
  } catch (erro) {
    next(erro);
  }
}

async function buscarLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro = await livrosService.buscarLivroPorId(id);

    res.status(200).json(livro);
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
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

async function criarLivro(req, res, next) {
  try {
    const novoLivro =
      await livrosService.criarLivro(req.body);

    res.status(201).json(novoLivro);
  } catch (erro) {
    next(erro);
  }
}

async function atualizarLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livroAtualizado =
      await livrosService.atualizarLivro(
        id,
        req.body
      );

    res.status(200).json(livroAtualizado);
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
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

async function atualizarParcialmenteLivro(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const camposPermitidos = [
      "titulo",
      "autor",
      "genero",
      "ano",
      "exemplaresDisponiveis"
    ];

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

    const livroAtualizado =
      await livrosService.atualizarParcialmenteLivro(
        id,
        req.body
      );

    res.status(200).json(livroAtualizado);
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
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

async function excluirLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    await livrosService.excluirLivro(id);

    res.status(204).send();
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
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
            "Não é possível excluir este livro porque existem empréstimos relacionados a ele."
        }
      });
    }

    next(erro);
  }
}

async function buscarLivroComRelacionamentos(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const livro =
      await livrosService.buscarLivroComRelacionamentos(
        id
      );

    res.status(200).json(livro);
  } catch (erro) {
    if (erro.codigo === "LIVRO_NAO_ENCONTRADO") {
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

module.exports = {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  atualizarParcialmenteLivro,
  excluirLivro,
  buscarLivroComRelacionamentos
};