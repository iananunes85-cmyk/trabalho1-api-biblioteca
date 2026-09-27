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
router.put(
  "/livros/:id",
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
  atualizarLivro
);

// Atualizar parcialmente livro
router.patch(
  "/livros/:id",
  [
    body("titulo")
      .optional()
      .notEmpty()
      .withMessage("O título não pode ser vazio."),

    body("autor")
      .optional()
      .notEmpty()
      .withMessage("O autor não pode ser vazio."),

    body("genero")
      .optional()
      .notEmpty()
      .withMessage("O gênero não pode ser vazio."),

    body("ano")
      .optional()
      .isInt()
      .withMessage("O ano deve ser um número inteiro."),

    body("exemplaresDisponiveis")
      .optional()
      .isInt({ min: 0 })
      .withMessage(
        "A quantidade de exemplares deve ser um número inteiro maior ou igual a zero."
      )
  ],
  validarRequisicao,
  atualizarParcialmenteLivro
);

// Excluir livro
router.delete("/livros/:id", excluirLivro);

module.exports = router;