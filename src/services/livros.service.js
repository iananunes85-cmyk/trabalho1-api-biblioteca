const livrosRepository = require("../repositories/livros.repository");

async function listarLivros(filtros) {
  return livrosRepository.listarLivros(filtros);
}

async function buscarLivroPorId(id) {
  const livro = await livrosRepository.buscarLivroPorId(id);

  if (!livro) {
    const erro = new Error(
      `Livro com id ${id} não encontrado`
    );
    erro.codigo = "LIVRO_NAO_ENCONTRADO";
    throw erro;
  }

  return livro;
}

async function criarLivro(dados) {
  return livrosRepository.criarLivro(dados);
}

async function atualizarLivro(id, dados) {
  await buscarLivroPorId(id);

  return livrosRepository.atualizarLivro(id, dados);
}

async function atualizarParcialmenteLivro(id, dados) {
  await buscarLivroPorId(id);

  return livrosRepository.atualizarParcialmenteLivro(
    id,
    dados
  );
}

async function excluirLivro(id) {
  await buscarLivroPorId(id);

  return livrosRepository.excluirLivro(id);
}

async function buscarLivroComRelacionamentos(id) {
  const livro =
    await livrosRepository.buscarLivroComRelacionamentos(id);

  if (!livro) {
    const erro = new Error(
      `Livro com id ${id} não encontrado`
    );
    erro.codigo = "LIVRO_NAO_ENCONTRADO";
    throw erro;
  }

  return livro;
}

module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  atualizarParcialmenteLivro,
  excluirLivro,
  buscarLivroComRelacionamentos
};