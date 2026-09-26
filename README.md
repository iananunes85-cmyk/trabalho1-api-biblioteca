# Trabalho 2 - API Biblioteca Escolar

API REST para gerenciamento de uma biblioteca escolar, desenvolvida com Node.js, Express, Prisma e SQLite.

## Objetivo

O projeto tem como objetivo desenvolver uma API REST organizada em camadas, permitindo o gerenciamento de:

- Livros
- Estudantes
- Empréstimos
- Categorias

Nesta etapa, a arquitetura foi reorganizada para separar as responsabilidades entre rotas, controladores, serviços e repositórios, reduzindo o acoplamento e facilitando a manutenção e a testabilidade do código.

---

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Better SQLite3
- Express Validator
- Swagger / OpenAPI
- Postman
- Git e GitHub

---

## Arquitetura do projeto

A aplicação utiliza uma arquitetura em camadas:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Prisma
   ↓
SQLite