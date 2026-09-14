const { livros } = require("../data/db-memoria");

// Listar livros com filtro, busca e paginação
function listarLivros(req, res) {
  const { genero, busca } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  let resultado = [...livros];

  // Filtro por gênero
  if (genero) {
    resultado = resultado.filter(
      livro => livro.genero.toLowerCase() === genero.toLowerCase()
    );
  }

  // Pesquisa por palavra-chave
  if (busca) {
    const palavra = busca.toLowerCase();

    resultado = resultado.filter(
      livro =>
        livro.titulo.toLowerCase().includes(palavra) ||
        livro.autor.toLowerCase().includes(palavra)
    );
  }

  // Paginação
  const total = resultado.length;
  const totalPaginas = Math.ceil(total / limit);

  const inicio = (page - 1) * limit;
  const fim = inicio + limit;

  const livrosPagina = resultado.slice(inicio, fim);

  res.status(200).json({
    dados: livrosPagina,
    paginacao: {
      pagina: page,
      limite: limit,
      total: total,
      totalPaginas: totalPaginas
    }
  });
}

// Buscar livro por ID
function buscarLivro(req, res) {
  const id = Number(req.params.id);

  const livro = livros.find(
    livro => livro.id === id
  );

  if (!livro) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Livro com id ${id} não encontrado`
      }
    });
  }

  res.status(200).json(livro);
}

// Criar livro
function criarLivro(req, res) {
  const { titulo, autor, genero, ano } = req.body;

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor,
    genero,
    ano
  };

  livros.push(novoLivro);

  res.status(201).json(novoLivro);
}

// Atualizar livro
function atualizarLivro(req, res) {
  const id = Number(req.params.id);

  const livro = livros.find(
    livro => livro.id === id
  );

  if (!livro) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Livro com id ${id} não encontrado`
      }
    });
  }

  const { titulo, autor, genero, ano } = req.body;

  livro.titulo = titulo;
  livro.autor = autor;
  livro.genero = genero;
  livro.ano = ano;

  res.status(200).json(livro);
}

// Atualizar parcialmente livro
function atualizarParcialmenteLivro(req, res) {
  const id = Number(req.params.id);

  const livro = livros.find(
    livro => livro.id === id
  );

  if (!livro) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Livro com id ${id} não encontrado`
      }
    });
  }

  Object.assign(livro, req.body);

  res.status(200).json(livro);
}

// Excluir livro
function excluirLivro(req, res) {
  const id = Number(req.params.id);

  const indice = livros.findIndex(
    livro => livro.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Livro com id ${id} não encontrado`
      }
    });
  }

  livros.splice(indice, 1);

  res.status(204).send();
}

module.exports = {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  atualizarParcialmenteLivro,
  excluirLivro
};