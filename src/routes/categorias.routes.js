const express = require("express");

const router = express.Router();

const {
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialmenteCategoria,
  excluirCategoria,
  buscarCategoriaComLivros
} = require("../controllers/categorias.controller");

const { body } = require("express-validator");
const validarRequisicao = require("../middlewares/validacao.middleware");


// Listar categorias
router.get("/categorias", listarCategorias);


// Buscar categoria por ID
router.get("/categorias/:id", buscarCategoria);


// Buscar categoria com livros relacionados
router.get(
  "/categorias/:id/livros",
  buscarCategoriaComLivros
);


// Criar categoria
router.post(
  "/categorias",
  [
    body("nome")
      .notEmpty()
      .withMessage("O nome da categoria é obrigatório.")
  ],
  validarRequisicao,
  criarCategoria
);


// Atualizar categoria
router.put(
  "/categorias/:id",
  [
    body("nome")
      .notEmpty()
      .withMessage("O nome da categoria é obrigatório.")
  ],
  validarRequisicao,
  atualizarCategoria
);


// Atualizar parcialmente categoria
router.patch(
  "/categorias/:id",
  [
    body("nome")
      .optional()
      .notEmpty()
      .withMessage("O nome da categoria não pode ser vazio.")
  ],
  validarRequisicao,
  atualizarParcialmenteCategoria
);


// Excluir categoria
router.delete(
  "/categorias/:id",
  excluirCategoria
);


module.exports = router;