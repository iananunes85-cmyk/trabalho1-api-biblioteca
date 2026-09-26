const categoriasService = require("../services/categorias.service");

async function listarCategorias(req, res, next) {
  try {
    const categorias =
      await categoriasService.listarCategorias();

    res.status(200).json(categorias);
  } catch (erro) {
    next(erro);
  }
}

async function buscarCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasService.buscarCategoriaPorId(id);

    res.status(200).json(categoria);
  } catch (erro) {
    if (erro.codigo === "CATEGORIA_NAO_ENCONTRADA") {
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

async function buscarCategoriaComLivros(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasService.buscarCategoriaComLivros(id);

    res.status(200).json(categoria);
  } catch (erro) {
    if (erro.codigo === "CATEGORIA_NAO_ENCONTRADA") {
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

async function criarCategoria(req, res, next) {
  try {
    const novaCategoria =
      await categoriasService.criarCategoria(req.body);

    res.status(201).json(novaCategoria);
  } catch (erro) {
    next(erro);
  }
}

async function atualizarCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoriaAtualizada =
      await categoriasService.atualizarCategoria(
        id,
        req.body
      );

    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    if (erro.codigo === "CATEGORIA_NAO_ENCONTRADA") {
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

async function atualizarParcialmenteCategoria(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const camposPermitidos = ["nome"];

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

    const categoriaAtualizada =
      await categoriasService.atualizarParcialmenteCategoria(
        id,
        req.body
      );

    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    if (erro.codigo === "CATEGORIA_NAO_ENCONTRADA") {
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

async function excluirCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    await categoriasService.excluirCategoria(id);

    res.status(204).send();
  } catch (erro) {
    if (erro.codigo === "CATEGORIA_NAO_ENCONTRADA") {
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
            "Não é possível excluir esta categoria porque existem livros relacionados a ela."
        }
      });
    }

    next(erro);
  }
}

module.exports = {
  listarCategorias,
  buscarCategoria,
  buscarCategoriaComLivros,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialmenteCategoria,
  excluirCategoria
};