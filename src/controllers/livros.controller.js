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

    const livroAtualizado =
      await livrosService.atualizarParcialmenteLivro(
        id,
        req.body
      );

    res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
}

async function excluirLivro(req, res, next) {
  try {
    const id = Number(req.params.id);

    await livrosService.excluirLivro(id);

    res.status(204).send();
  } catch (erro) {
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