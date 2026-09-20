const livrosRepository = require("../repositories/livros.repository");

// Listar livros
async function listarLivros(req, res, next) {
  try {
    const { genero, busca, ordenarPor, ordem } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const resultado = await livrosRepository.listarLivros({
      genero,
      busca,
      page,
      limit,
      ordenarPor,
      ordem
    });

    const totalPaginas = Math.ceil(resultado.total / limit);

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


// Buscar livro por ID
async function buscarLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro = await livrosRepository.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${id} não encontrado`
        }
      });
    }

    res.status(200).json(livro);
  } catch (erro) {
    next(erro);
  }
}


// Criar livro
async function criarLivro(req, res, next) {
  try {
    const novoLivro = await livrosRepository.criarLivro(req.body);

    res.status(201).json(novoLivro);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar livro
async function atualizarLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro = await livrosRepository.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${id} não encontrado`
        }
      });
    }

    const livroAtualizado =
      await livrosRepository.atualizarLivro(id, req.body);

    res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar parcialmente livro
async function atualizarParcialmenteLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro = await livrosRepository.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${id} não encontrado`
        }
      });
    }

    const camposPermitidos = [
      "titulo",
      "autor",
      "genero",
      "ano",
      "exemplaresDisponiveis"
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

    const livroAtualizado =
      await livrosRepository.atualizarParcialmenteLivro(
        id,
        req.body
      );

    res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
}


// Excluir livro
async function excluirLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro =
      await livrosRepository.buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${id} não encontrado`
        }
      });
    }

    await livrosRepository.excluirLivro(id);

    res.status(204).send();

  } catch (erro) {

    // Impede a exclusão quando existem empréstimos relacionados
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


// Buscar livro com relacionamentos
async function buscarLivroComRelacionamentos(req, res, next) {
  try {
    const id = Number(req.params.id);

    const livro =
      await livrosRepository.buscarLivroComRelacionamentos(id);

    if (!livro) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Livro com id ${id} não encontrado`
        }
      });
    }

    res.status(200).json(livro);
  } catch (erro) {
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