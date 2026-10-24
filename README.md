# API de Gerenciamento de Pedidos

Trabalho prático avaliativo da disciplina de **Tópicos Avançados em Sistemas de Informação II**.

API REST para gerenciamento de pedidos de uma pequena loja, desenvolvida com **Node.js** e **Express**, com armazenamento em memória.

**Integrantes do grupo:**

| Pedro Isaque Vieira Pereira| 43827128 |
| Matheus Castrão Alves |   |
| Matheus de Jesus Eduardo Ferreira | 45915709 |

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm start
   ```

A API estará rodando na porta `3000` (`http://localhost:3000`).

> Os dados ficam armazenados em memória. Ao reiniciar a aplicação, os pedidos cadastrados são perdidos.

---

## 📌 Arquitetura do Projeto

O projeto segue a **arquitetura em camadas**, separando as responsabilidades:

```
src/
├── routes/        # Definição dos endpoints
├── controllers/   # Recebe a requisição e devolve a resposta HTTP
├── services/      # Regras de negócio, validações e armazenamento em memória
└── server.js      # Configuração do Express e middlewares
```

- **`src/routes/`**: define as rotas REST e as associa aos controllers.
- **`src/controllers/`**: recebe a requisição, chama o service e formata a resposta com o código HTTP adequado.
- **`src/services/`**: contém as regras de negócio, as validações e a manipulação dos dados em memória.
- **`src/server.js`**: configura o servidor Express, o parser de JSON e o tratamento de erros.

### Padrão implementado

- **Arquitetura em camadas** (routes → controllers → services), com cada camada dependendo apenas da camada seguinte.
- **Tratamento centralizado de erros** por middleware: erros de validação resultam em HTTP 400, recursos inexistentes em HTTP 404 e erros inesperados em HTTP 500.

---

## 🛠 Endpoints Disponíveis

| Método  | Rota                  | Descrição                      | Respostas     |
| :------ | :-------------------- | :----------------------------- | :------------ |
| `POST`  | `/pedidos`            | Cadastra um novo pedido        | 201, 400      |
| `GET`   | `/pedidos`            | Lista todos os pedidos         | 200           |
| `GET`   | `/pedidos/:id`        | Consulta um pedido pelo ID     | 200, 404      |
| `PATCH` | `/pedidos/:id/status` | Atualiza o status de um pedido | 200, 400, 404 |

---

## ✅ Regras de Validação

### Campos do pedido

| Campo        | Regra                                                                          |
| :----------- | :----------------------------------------------------------------------------- |
| `cliente`    | Obrigatório. Texto não vazio, inclusive após remover espaços das extremidades. |
| `tipo`       | Obrigatório. Valores aceitos: `entrega`, `retirada`.                           |
| `valor`      | Obrigatório. Deve ser numérico e maior que zero.                               |
| `prioridade` | Obrigatória. Valores aceitos: `baixa`, `normal`, `alta`.                       |

### Status do pedido

Status possíveis: `recebido`, `em_preparacao`, `enviado`, `entregue` e `cancelado`.

Todo pedido novo é criado com o status `recebido`.

### Transições de status permitidas

| Status atual    | Pode mudar para              |
| :-------------- | :--------------------------- |
| `recebido`      | `em_preparacao`, `cancelado` |
| `em_preparacao` | `enviado`, `cancelado`       |
| `enviado`       | `entregue`                   |
| `entregue`      | nenhum (status final)        |
| `cancelado`     | nenhum (status final)        |

Qualquer transição fora dessa tabela, ou um status desconhecido, retorna HTTP 400.

---

## 📨 Exemplos de Requisição e Resposta

### Criar pedido (`POST /pedidos`)

Requisição:

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta (`201 Created`):

```json
{
  "id": 1,
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal",
  "status": "recebido"
}
```

### Listar pedidos (`GET /pedidos`)

Resposta (`200 OK`):

```json
[
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "recebido"
  }
]
```

### Consultar pedido (`GET /pedidos/1`)

Resposta (`200 OK`): o pedido correspondente, no mesmo formato acima.

### Atualizar status (`PATCH /pedidos/1/status`)

Requisição:

```json
{
  "status": "em_preparacao"
}
```

Resposta (`200 OK`):

```json
{
  "id": 1,
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal",
  "status": "em_preparacao"
}
```

---

## ⚠️ Respostas de Erro

| Código | Situação                                                                      |
| :----- | :---------------------------------------------------------------------------- |
| `400`  | Dados inválidos (campo ausente, valor inválido, status ou transição inválida) |
| `404`  | Pedido com o ID informado não existe                                          |
| `500`  | Erro inesperado no servidor                                                   |

Exemplo (`400 Bad Request`):

```json
{
  "erro": "O campo 'valor' deve ser numérico e maior que zero."
}
```

Exemplo (`404 Not Found`):

```json
{
  "erro": "Pedido não encontrado."
}
```

---

## 🧪 Testes

Testes manuais feitos com o **Postman**. As capturas de tela estão na pasta [`evidencias/`](./evidencias):

- `01-criacao.png`: POST válido (201)
- `02-validacao.png`: POST inválido (400)
- `03-listagem.png`: GET da lista de pedidos (200)
- `04-consulta-inexistente.png`: GET de ID inexistente (404)
- `05-atualizacao.png`: PATCH de status válido (200)

---

## 🤖 Uso de IA

**Utilizei IA?** Sim.

**Ferramenta:** Claude (Anthropic).

**Tarefas:** estruturação inicial do projeto em camadas (routes, controllers, services), implementação das validações de entrada e geração do README.

**Sugestão aceita:** a IA sugeriu criar um tratamento centralizado de erros e uma estrutura desacoplada em 3 camadas. Aceitei porque separa as responsabilidades (rotas, controle HTTP e regras de negócio) e evita repetir tratamento de erro em cada controller.
