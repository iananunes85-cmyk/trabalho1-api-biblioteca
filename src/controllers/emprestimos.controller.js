const { emprestimos, livros, estudantes } = require("../data/db-memoria");

// Listar empréstimos
function listarEmprestimos(req, res) {
  res.status(200).json(emprestimos);
}

// Buscar empréstimo por ID
function buscarEmprestimo(req, res) {
  const id = Number(req.params.id);

  const emprestimo = emprestimos.find(
    emprestimo => emprestimo.id === id
  );

  if (!emprestimo) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Empréstimo com id ${id} não encontrado`
      }
    });
  }

  res.status(200).json(emprestimo);
}

// Criar empréstimo
function criarEmprestimo(req, res) {
  const { livroId, estudanteId, dataEmprestimo } = req.body;

  const livroExiste = livros.some(
    livro => livro.id === Number(livroId)
  );

  if (!livroExiste) {
    return res.status(404).json({
      erro: {
        codigo: "LIVRO_NAO_ENCONTRADO",
        mensagem: `Livro com id ${livroId} não encontrado`
      }
    });
  }

  const estudanteExiste = estudantes.some(
    estudante => estudante.id === Number(estudanteId)
  );

  if (!estudanteExiste) {
    return res.status(404).json({
      erro: {
        codigo: "ESTUDANTE_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${estudanteId} não encontrado`
      }
    });
  }

  const novoEmprestimo = {
    id: emprestimos.length + 1,
    livroId: Number(livroId),
    estudanteId: Number(estudanteId),
    dataEmprestimo,
    devolvido: false
  };

  emprestimos.push(novoEmprestimo);

  res.status(201).json(novoEmprestimo);
}

// Atualizar empréstimo
function atualizarEmprestimo(req, res) {
  const id = Number(req.params.id);

  const emprestimo = emprestimos.find(
    emprestimo => emprestimo.id === id
  );

  if (!emprestimo) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Empréstimo com id ${id} não encontrado`
      }
    });
  }

  const {
    livroId,
    estudanteId,
    dataEmprestimo,
    devolvido
  } = req.body;

  emprestimo.livroId = Number(livroId);
  emprestimo.estudanteId = Number(estudanteId);
  emprestimo.dataEmprestimo = dataEmprestimo;
  emprestimo.devolvido = devolvido;

  res.status(200).json(emprestimo);
}

// Atualizar parcialmente empréstimo
function atualizarParcialmenteEmprestimo(req, res) {
  const id = Number(req.params.id);

  const emprestimo = emprestimos.find(
    emprestimo => emprestimo.id === id
  );

  if (!emprestimo) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Empréstimo com id ${id} não encontrado`
      }
    });
  }

  if (req.body.livroId !== undefined) {
    emprestimo.livroId = Number(req.body.livroId);
  }

  if (req.body.estudanteId !== undefined) {
    emprestimo.estudanteId = Number(req.body.estudanteId);
  }

  if (req.body.dataEmprestimo !== undefined) {
    emprestimo.dataEmprestimo = req.body.dataEmprestimo;
  }

  if (req.body.devolvido !== undefined) {
    emprestimo.devolvido = req.body.devolvido;
  }

  res.status(200).json(emprestimo);
}

// Excluir empréstimo
function excluirEmprestimo(req, res) {
  const id = Number(req.params.id);

  const indice = emprestimos.findIndex(
    emprestimo => emprestimo.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Empréstimo com id ${id} não encontrado`
      }
    });
  }

  emprestimos.splice(indice, 1);

  res.status(204).send();
}

// Listar empréstimos de um estudante
function listarEmprestimosDoEstudante(req, res) {
  const estudanteId = Number(req.params.id);

  const estudanteExiste = estudantes.some(
    estudante => estudante.id === estudanteId
  );

  if (!estudanteExiste) {
    return res.status(404).json({
      erro: {
        codigo: "ESTUDANTE_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${estudanteId} não encontrado`
      }
    });
  }

  const resultado = emprestimos.filter(
    emprestimo => emprestimo.estudanteId === estudanteId
  );

  res.status(200).json(resultado);
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