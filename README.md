# API Biblioteca Escolar

Projeto desenvolvido para a disciplina de desenvolvimento de APIs REST.

## Descrição

A API Biblioteca Escolar foi desenvolvida para organizar informações de uma biblioteca escolar, permitindo o gerenciamento de livros, estudantes e empréstimos.

O projeto foi desenvolvido utilizando Node.js e Express, com armazenamento dos dados em memória, conforme proposto na atividade.

## Tecnologias utilizadas

- Node.js
- Express
- Express Validator
- Swagger UI
- OpenAPI 3.0
- YAML
- Postman

## Recursos da API

A API possui três recursos principais:

- Livros
- Estudantes
- Empréstimos

Também possui uma rota relacionada para consultar os empréstimos de um estudante.

## Endpoints principais

### Livros

- GET `/livros` - Lista todos os livros
- GET `/livros/:id` - Busca um livro pelo ID
- POST `/livros` - Cadastra um novo livro
- PUT `/livros/:id` - Atualiza um livro
- PATCH `/livros/:id` - Atualiza parcialmente um livro
- DELETE `/livros/:id` - Exclui um livro

### Estudantes

- GET `/estudantes` - Lista todos os estudantes
- GET `/estudantes/:id` - Busca um estudante pelo ID
- POST `/estudantes` - Cadastra um novo estudante
- PUT `/estudantes/:id` - Atualiza um estudante
- PATCH `/estudantes/:id` - Atualiza parcialmente um estudante
- DELETE `/estudantes/:id` - Exclui um estudante

### Empréstimos

- GET `/emprestimos` - Lista todos os empréstimos
- GET `/emprestimos/:id` - Busca um empréstimo pelo ID
- POST `/emprestimos` - Registra um novo empréstimo
- PUT `/emprestimos/:id` - Atualiza um empréstimo
- PATCH `/emprestimos/:id` - Atualiza parcialmente um empréstimo
- DELETE `/emprestimos/:id` - Exclui um empréstimo

### Rota relacionada

- GET `/estudantes/:id/emprestimos` - Lista os empréstimos de um estudante

## Filtros, busca e paginação

A API de livros possui recursos de filtro, busca e paginação.

### Filtro por gênero

```text
GET /livros?genero=romance