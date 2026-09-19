# API Biblioteca Escolar

Projeto desenvolvido para a disciplina de Desenvolvimento de APIs REST.

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

## Instalação

Após clonar ou baixar o projeto, acesse a pasta principal da aplicação, onde está localizado o arquivo `package.json`.

Instale as dependências com:

```bash
npm install


## Execução

Para iniciar a API, utilize:

```bash
npm start
```

Após iniciar, a API estará disponível em:

```text
http://localhost:3000
```

A mensagem inicial da API pode ser acessada em:

```text
http://localhost:3000/
```

## Documentação da API

A documentação da API foi desenvolvida utilizando OpenAPI 3.0 e Swagger UI.

Para acessar a documentação:

```text
http://localhost:3000/docs
```

## Endpoints principais

### Livros

- GET `/livros` - Lista os livros
- GET `/livros/:id` - Busca um livro pelo ID
- POST `/livros` - Cadastra um novo livro
- PUT `/livros/:id` - Atualiza um livro
- PATCH `/livros/:id` - Atualiza parcialmente um livro
- DELETE `/livros/:id` - Exclui um livro

### Estudantes

- GET `/estudantes` - Lista os estudantes
- GET `/estudantes/:id` - Busca um estudante pelo ID
- POST `/estudantes` - Cadastra um novo estudante
- PUT `/estudantes/:id` - Atualiza um estudante
- PATCH `/estudantes/:id` - Atualiza parcialmente um estudante
- DELETE `/estudantes/:id` - Exclui um estudante

### Empréstimos

- GET `/emprestimos` - Lista os empréstimos
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
```

### Busca por palavra-chave

```text
GET /livros?busca=dom
```

### Paginação

```text
GET /livros?page=1&limit=10
```

## Validação e tratamento de erros

A API possui validação dos dados enviados nas requisições e tratamento padronizado de erros.

Entre os casos tratados estão:

- dados inválidos;
- recurso não encontrado;
- conflitos de dados;
- parâmetros inválidos;
- erros internos do servidor.

## Postman

O projeto possui uma coleção do Postman para testar os endpoints da API.

O arquivo da coleção está disponível no projeto:

`postman_collection.json`

A coleção contém requisições para os recursos de:

- Livros;
- Estudantes;
- Empréstimos;
- filtros;
- busca;
- paginação;
- validações e tratamento de erros.

## Armazenamento dos dados

Para este trabalho, os dados são armazenados em memória, conforme definido na proposta da atividade.

Não é utilizado banco de dados nesta versão do projeto.

## Repositório

O projeto está disponível no GitHub no repositório:

`trabalho1-api-biblioteca`
## Repositório

O projeto está disponível no GitHub no repositório:

https://github.com/iananunes85-cmyk/trabalho1-api-biblioteca