const { estudantes } = require("../data/db-memoria");

// Listar estudantes
function listarEstudantes(req, res) {
  res.status(200).json(estudantes);
}

// Buscar estudante por ID
function buscarEstudante(req, res) {
  const id = Number(req.params.id);

  const estudante = estudantes.find(
    estudante => estudante.id === id
  );

  if (!estudante) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${id} não encontrado`
      }
    });
  }

  res.status(200).json(estudante);
}

// Criar estudante
function criarEstudante(req, res) {
  const { nome, email } = req.body;

  // Verificar se o e-mail já existe
  const emailExiste = estudantes.some(
    estudante => estudante.email === email
  );

  if (emailExiste) {
    return res.status(409).json({
      erro: {
        codigo: "CONFLITO",
        mensagem: "Já existe um estudante cadastrado com este e-mail."
      }
    });
  }

  const novoEstudante = {
    id: estudantes.length + 1,
    nome,
    email
  };

  estudantes.push(novoEstudante);

  res.status(201).json(novoEstudante);
}

// Atualizar estudante
function atualizarEstudante(req, res) {
  const id = Number(req.params.id);

  const estudante = estudantes.find(
    estudante => estudante.id === id
  );

  if (!estudante) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${id} não encontrado`
      }
    });
  }

  const { nome, email } = req.body;

  estudante.nome = nome;
  estudante.email = email;

  res.status(200).json(estudante);
}

// Atualizar parcialmente estudante
function atualizarParcialmenteEstudante(req, res) {
  const id = Number(req.params.id);

  const estudante = estudantes.find(
    estudante => estudante.id === id
  );

  if (!estudante) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${id} não encontrado`
      }
    });
  }

  Object.assign(estudante, req.body);

  res.status(200).json(estudante);
}

// Excluir estudante
function excluirEstudante(req, res) {
  const id = Number(req.params.id);

  const indice = estudantes.findIndex(
    estudante => estudante.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: `Estudante com id ${id} não encontrado`
      }
    });
  }

  estudantes.splice(indice, 1);

  res.status(204).send();
}

module.exports = {
  listarEstudantes,
  buscarEstudante,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
};