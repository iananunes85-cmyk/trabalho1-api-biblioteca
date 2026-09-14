const { validationResult } = require("express-validator");

function validarRequisicao(req, res, next) {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      erro: {
        codigo: "DADOS_INVALIDOS",
        mensagem: "Os dados enviados são inválidos.",
        detalhes: erros.array()
      }
    });
  }

  next();
}

module.exports = validarRequisicao;