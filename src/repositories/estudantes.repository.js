const prisma = require("../database/prisma");

// Listar estudantes
async function listarEstudantes() {
  return prisma.estudante.findMany({
    orderBy: {
      id: "asc"
    }
  });
}


// Buscar estudante por ID
async function buscarEstudantePorId(id) {
  return prisma.estudante.findUnique({
    where: {
      id
    }
  });
}


// Buscar estudante por e-mail
async function buscarEstudantePorEmail(email) {
  return prisma.estudante.findUnique({
    where: {
      email
    }
  });
}


// Criar estudante
async function criarEstudante(dados) {
  return prisma.estudante.create({
    data: {
      nome: dados.nome,
      email: dados.email
    }
  });
}


// Atualizar estudante
async function atualizarEstudante(id, dados) {
  return prisma.estudante.update({
    where: {
      id
    },
    data: {
      nome: dados.nome,
      email: dados.email
    }
  });
}


// Atualização parcial
async function atualizarParcialmenteEstudante(id, dados) {
  const camposPermitidos = [
    "nome",
    "email"
  ];

  const data = {};

  for (const campo of camposPermitidos) {
    if (dados[campo] !== undefined) {
      data[campo] = dados[campo];
    }
  }

  return prisma.estudante.update({
    where: {
      id
    },
    data
  });
}


// Excluir estudante
async function excluirEstudante(id) {
  return prisma.estudante.delete({
    where: {
      id
    }
  });
}


module.exports = {
  listarEstudantes,
  buscarEstudantePorId,
  buscarEstudantePorEmail,
  criarEstudante,
  atualizarEstudante,
  atualizarParcialmenteEstudante,
  excluirEstudante
};