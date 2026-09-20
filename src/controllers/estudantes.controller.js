const estudantesRepository = require("../repositories/estudantes.repository");

// Listar estudantes
async function listarEstudantes(req, res, next) {
  try {
    const estudantes =
      await estudantesRepository.listarEstudantes();

    res.status(200).json(estudantes);
  } catch (erro) {
    next(erro);
  }
}


// Buscar estudante por ID
async function buscarEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    const estudante =
      await estudantesRepository.buscarEstudantePorId(id);

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${id} não encontrado`
        }
      });
    }

    res.status(200).json(estudante);
  } catch (erro) {
    next(erro);
  }
}


// Criar estudante
async function criarEstudante(req, res, next) {
  try {
    const { nome, email } = req.body;

    const emailExiste =
      await estudantesRepository.buscarEstudantePorEmail(email);

    if (emailExiste) {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO",
          mensagem:
            "Já existe um estudante cadastrado com este e-mail."
        }
      });
    }

    const novoEstudante =
      await estudantesRepository.criarEstudante({
        nome,
        email
      });

    res.status(201).json(novoEstudante);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar estudante
async function atualizarEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    const estudante =
      await estudantesRepository.buscarEstudantePorId(id);

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${id} não encontrado`
        }
      });
    }

    const { nome, email } = req.body;

    if (email && email !== estudante.email) {
      const emailExiste =
        await estudantesRepository.buscarEstudantePorEmail(email);

      if (emailExiste) {
        return res.status(409).json({
          erro: {
            codigo: "CONFLITO",
            mensagem:
              "Já existe um estudante cadastrado com este e-mail."
          }
        });
      }
    }

    const estudanteAtualizado =
      await estudantesRepository.atualizarEstudante(
        id,
        {
          nome,
          email
        }
      );

    res.status(200).json(estudanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}


// Atualizar parcialmente estudante
async function atualizarParcialmenteEstudante(
  req,
  res,
  next
) {
  try {
    const id = Number(req.params.id);

    const estudante =
      await estudantesRepository.buscarEstudantePorId(id);

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${id} não encontrado`
        }
      });
    }

    const camposPermitidos = [
      "nome",
      "email"
    ];

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

    if (
      req.body.email &&
      req.body.email !== estudante.email
    ) {
      const emailExiste =
        await estudantesRepository.buscarEstudantePorEmail(
          req.body.email
        );

      if (emailExiste) {
        return res.status(409).json({
          erro: {
            codigo: "CONFLITO",
            mensagem:
              "Já existe um estudante cadastrado com este e-mail."
          }
        });
      }
    }

    const estudanteAtualizado =
      await estudantesRepository.atualizarParcialmenteEstudante(
        id,
        req.body
      );

    res.status(200).json(estudanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}


// Excluir estudante
async function excluirEstudante(req, res, next) {
  try {
    const id = Number(req.params.id);

    const estudante =
      await estudantesRepository.buscarEstudantePorId(id);

    if (!estudante) {
      return res.status(404).json({
        erro: {
          codigo: "RECURSO_NAO_ENCONTRADO",
          mensagem: `Estudante com id ${id} não encontrado`
        }
      });
    }

    await estudantesRepository.excluirEstudante(id);

    res.status(204).send();

  } catch (erro) {

    // Impede a exclusão quando existem empréstimos relacionados
    if (erro.code === "P2003") {
      return res.status(409).json({
        erro: {
          codigo: "CONFLITO_INTEGRIDADE",
          mensagem:
            "Não é possível excluir este estudante porque existem empréstimos relacionados a ele."
        }
      });
    }

    next(erro);
  }
}


module.exports = {
  listarEstudantes,
  buscarEstudante,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
};