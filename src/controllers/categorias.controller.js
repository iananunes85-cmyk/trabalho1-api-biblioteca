const categoriasRepository = require("../repositories/categorias.repository");

// Listar categorias
async function listarCategorias(req, res, next) {
  try {
    const categorias =
      await categoriasRepository.listarCategorias();

    res.status(200).json(categorias);
  } catch (erro) {
    next(erro);
  }
}


// Buscar categoria por ID
async function buscarCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasRepository.buscarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Categoria com id ${id} não encontrada`
        }
      });
    }

    res.status(200).json(categoria);
  } catch (erro) {
    next(erro);
  }
}


// Criar categoria
async function criarCategoria(req, res, next) {
  try {
    const { nome } = req.body;

    const categoriaExiste =
      await categoriasRepository.buscarCategoriaPorNome(nome);

    if (categoriaExiste) {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem: "Já existe uma categoria com este nome."
        }
      });
    }

    const novaCategoria =
      await categoriasRepository.criarCategoria({
        nome
      });

    res.status(201).json(novaCategoria);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar categoria
async function atualizarCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasRepository.buscarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Categoria com id ${id} não encontrada`
        }
      });
    }

    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: {
          codigo: "DADOS_INVALIDOS",
          mensagem: "O nome da categoria é obrigatório."
        }
      });
    }

    const categoriaExiste =
      await categoriasRepository.buscarCategoriaPorNome(nome);

    if (
      categoriaExiste &&
      categoriaExiste.id !== id
    ) {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem: "Já existe uma categoria com este nome."
        }
      });
    }

    const categoriaAtualizada =
      await categoriasRepository.atualizarCategoria(
        id,
        {
          nome
        }
      );

    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar parcialmente categoria
async function atualizarParcialmenteCategoria(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasRepository.buscarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Categoria com id ${id} não encontrada`
        }
      });
    }

    const camposPermitidos = ["nome"];

    const camposInformados = Object.keys(req.body)
      .filter(campo =>
        camposPermitidos.includes(campo)
      );

    if (camposInformados.length === 0) {
      return res.status(400).json({
        erro: {
          codigo: "DADOS_INVALIDOS",
          mensagem: "Nenhum campo válido foi informado."
        }
      });
    }

    if (req.body.nome) {
      const categoriaExiste =
        await categoriasRepository.buscarCategoriaPorNome(
          req.body.nome
        );

      if (
        categoriaExiste &&
        categoriaExiste.id !== id
      ) {
        return res.status(409).json({
          erro: {
            codigo: "CONFLITO",
            mensagem: "Já existe uma categoria com este nome."
          }
        });
      }
    }

    const categoriaAtualizada =
      await categoriasRepository.atualizarParcialmenteCategoria(
        id,
        req.body
      );

    res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    next(erro);
  }
}


// Excluir categoria
async function excluirCategoria(req, res, next) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasRepository.buscarCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Categoria com id ${id} não encontrada`
        }
      });
    }

    await categoriasRepository.excluirCategoria(id);

    res.status(204).send();
  } catch (erro) {

    // Impede exclusão quando existem livros relacionados
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


// Buscar categoria com os livros relacionados
async function buscarCategoriaComLivros(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const categoria =
      await categoriasRepository.buscarCategoriaComLivros(id);

    if (!categoria) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Categoria com id ${id} não encontrada`
        }
      });
    }

    res.status(200).json(categoria);
  } catch (erro) {
    next(erro);
  }
}


module.exports = {
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialmenteCategoria,
  excluirCategoria,
  buscarCategoriaComLivros
};