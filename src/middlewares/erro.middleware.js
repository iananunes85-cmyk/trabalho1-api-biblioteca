// Middleware centralizado de tratamento de erros
function tratarErro(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    erro: {
      codigo: "ERRO_INTERNO",
      mensagem: "Ocorreu um erro interno no servidor."
    }
  });
}

module.exports = tratarErro;