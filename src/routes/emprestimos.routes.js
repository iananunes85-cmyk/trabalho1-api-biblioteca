const express = require("express");

const router = express.Router();

const {
  listarEmprestimos,
  buscarEmprestimo,
  criarEmprestimo,
  atualizarEmprestimo,
  atualizarParcialmenteEmprestimo,
  excluirEmprestimo,
  listarEmprestimosDoEstudante
} = require("../controllers/emprestimos.controller");

// Listar empréstimos
router.get("/emprestimos", listarEmprestimos);

// Listar empréstimos de um estudante
router.get(
  "/estudantes/:id/emprestimos",
  listarEmprestimosDoEstudante
);

// Buscar empréstimo por ID
router.get("/emprestimos/:id", buscarEmprestimo);

// Criar empréstimo
router.post("/emprestimos", criarEmprestimo);

// Atualizar empréstimo
router.put("/emprestimos/:id", atualizarEmprestimo);

// Atualizar parcialmente empréstimo
router.patch("/emprestimos/:id", atualizarParcialmenteEmprestimo);

// Excluir empréstimo
router.delete("/emprestimos/:id", excluirEmprestimo);

module.exports = router;