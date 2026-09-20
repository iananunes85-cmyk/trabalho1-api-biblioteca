// Middleware centralizado de tratamento de erros

function tratarErro(err, req, res, next) {
  console.error(err);

  // Violação de campo UNIQUE
  if (err.code === "P2002") {
    return res.status(409).json({
      erro: {
        codigo: "CONFLITO",
        mensagem: "Já existe um registro com este valor."
      }
    });
  }

  // Registro não encontrado em uma operação do Prisma
  if (err.code === "P2025") {
    return res.status(404).json({
      erro: {
        codigo: "RECURSO_NAO_ENCONTRADO",
        mensagem: "O recurso solicitado não foi encontrado."
      }
    });
  }

  // Violação de integridade referencial
  if (err.code === "P2003") {
    return res.status(409).json({
      erro: {
        codigo: "CONFLITO_INTEGRIDADE",
        mensagem:
          "Não é possível realizar esta operação porque existem registros relacionados."
      }
    });
  }

  // Erro de conexão com o banco de dados
  if (
    err.code === "P1000" ||
    err.code === "P1001" ||
    err.code === "P1002" ||
    err.code === "P1008"
  ) {
    return res.status(503).json({
      erro: {
        codigo: "BANCO_INDISPONIVEL",
        mensagem: "Não foi possível acessar o banco de dados."
      }
    });
  }

  // Erro interno não tratado
  return res.status(500).json({
    erro: {
      codigo: "ERRO_INTERNO",
      mensagem: "Ocorreu um erro interno no servidor."
    }
  });
}

module.exports = tratarErro;