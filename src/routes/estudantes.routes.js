const express = require("express");

const router = express.Router();

const {
  listarEstudantes,
  buscarEstudante,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
} = require("../controllers/estudantes.controller");

const { body } = require("express-validator");
const validarRequisicao = require("../middlewares/validacao.middleware");

// Listar estudantes
router.get("/estudantes", listarEstudantes);

// Buscar estudante por ID
router.get("/estudantes/:id", buscarEstudante);

// Criar estudante
router.post(
  "/estudantes",
  [
    body("nome")
      .notEmpty()
      .withMessage("O nome é obrigatório."),

    body("email")
      .isEmail()
      .withMessage("O e-mail deve ser válido.")
  ],
  validarRequisicao,
  criarEstudante
);

// Atualizar estudante
router.put("/estudantes/:id", atualizarEstudante);

// Atualizar parcialmente estudante
router.patch("/estudantes/:id", atualizarParcialmenteEstudante);

// Excluir estudante
router.delete("/estudantes/:id", excluirEstudante);

module.exports = router;