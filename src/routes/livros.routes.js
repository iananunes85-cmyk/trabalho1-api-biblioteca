const express = require("express");

const router = express.Router();

const {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  atualizarParcialmenteLivro,
  excluirLivro,
  buscarLivroComRelacionamentos
} = require("../controllers/livros.controller");

const { body } = require("express-validator");
const validarRequisicao = require("../middlewares/validacao.middleware");

// Listar livros
router.get("/livros", listarLivros);

// Buscar livro por ID
router.get("/livros/:id", buscarLivro);

// Buscar livro com categorias e empréstimos
router.get(
  "/livros/:id/relacionamentos",
  buscarLivroComRelacionamentos
);

// Criar livro
router.post(
  "/livros",
  [
    body("titulo")
      .notEmpty()
      .withMessage("O título é obrigatório."),

    body("autor")
      .notEmpty()
      .withMessage("O autor é obrigatório."),

    body("genero")
      .notEmpty()
      .withMessage("O gênero é obrigatório."),

    body("ano")
      .isInt()
      .withMessage("O ano deve ser um número inteiro.")
  ],
  validarRequisicao,
  criarLivro
);

// Atualizar livro
router.put("/livros/:id", atualizarLivro);

// Atualizar parcialmente livro
router.patch("/livros/:id", atualizarParcialmenteLivro);

// Excluir livro
router.delete("/livros/:id", excluirLivro);

module.exports = router;