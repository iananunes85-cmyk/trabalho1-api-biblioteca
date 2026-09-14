const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();

app.use(express.json());

// Carregar documentação OpenAPI
const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

// Documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de livros
const livrosRoutes = require("./routes/livros.routes");
app.use(livrosRoutes);

// Rotas de estudantes
const estudantesRoutes = require("./routes/estudantes.routes");
app.use(estudantesRoutes);

// Rotas de empréstimos
const emprestimosRoutes = require("./routes/emprestimos.routes");
app.use(emprestimosRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "API Biblioteca Escolar funcionando!"
  });
});

// Middleware centralizado de erros
const tratarErro = require("./middlewares/erro.middleware");
app.use(tratarErro);

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});