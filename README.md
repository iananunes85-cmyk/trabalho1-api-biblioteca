# API Biblioteca Escolar

Projeto desenvolvido para a disciplina de Desenvolvimento de APIs REST, com evolução do Trabalho 1 para persistência de dados utilizando ORM.

## Descrição

A API Biblioteca Escolar permite o gerenciamento de livros, estudantes, categorias e empréstimos.

Nesta etapa do projeto, os dados passaram a ser armazenados em banco de dados SQLite, utilizando o Prisma ORM.

O projeto também possui migrations, seed, relacionamentos entre as entidades, validações, paginação, filtros, ordenação e transações.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- better-sqlite3
- Express Validator
- Swagger UI
- OpenAPI 3.0
- YAML
- Postman

## Estrutura do projeto

```text
trabalho2/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   ├── database/
│   ├── docs/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── postman_collection.json
├── prisma.config.ts
└── README.md