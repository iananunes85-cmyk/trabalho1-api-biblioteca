const categoriasRepository = require("../repositories/categorias.repository");

async function listarCategorias() {
  return categoriasRepository.listarCategorias();
}

async function buscarCategoriaPorId(id) {
  const categoria =
    await categoriasRepository.buscarCategoriaPorId(id);

  if (!categoria) {
    const erro = new Error(
      `Categoria com id ${id} não encontrada`
    );
    erro.codigo = "CATEGORIA_NAO_ENCONTRADA";
    throw erro;
  }

  return categoria;
}

async function buscarCategoriaComLivros(id) {
  const categoria =
    await categoriasRepository.buscarCategoriaComLivros(id);

  if (!categoria) {
    const erro = new Error(
      `Categoria com id ${id} não encontrada`
    );
    erro.codigo = "CATEGORIA_NAO_ENCONTRADA";
    throw erro;
  }

  return categoria;
}

async function criarCategoria(dados) {
  return categoriasRepository.criarCategoria(dados);
}

async function atualizarCategoria(id, dados) {
  await buscarCategoriaPorId(id);

  return categoriasRepository.atualizarCategoria(
    id,
    dados
  );
}

async function atualizarParcialmenteCategoria(
  id,
  dados
) {
  await buscarCategoriaPorId(id);

  return categoriasRepository.atualizarParcialmenteCategoria(
    id,
    dados
  );
}

async function excluirCategoria(id) {
  await buscarCategoriaPorId(id);

  return categoriasRepository.excluirCategoria(id);
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  buscarCategoriaComLivros,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialmenteCategoria,
  excluirCategoria
};