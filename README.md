# API de Gerenciamento de Pedidos

Trabalho prático avaliativo da disciplina de **Tópicos Avançados em Sistemas de Informação II**.

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

---

## 📌 Arquitetura do Projeto

O projeto segue a arquitetura em camadas descrita abaixo:

- `src/routes/`: Definição dos endpoints REST HTTP.
- `src/controllers/`: Recebe as requisições, chama os serviços e formata as respostas HTTP.
- `src/services/`: Regras de negócio e armazenamento/manipulação de dados em memória.
- `src/server.js`: Configuração do servidor Express e Middlewares.

---

## 🛠 Endpoints Disponíveis

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/pedidos` | Cadastra um novo pedido |
| `GET` | `/pedidos` | Lista todos os pedidos |
| `GET` | `/pedidos/:id` | Consulta um pedido pelo ID |
| `PATCH` | `/pedidos/:id/status` | Atualiza o status de um pedido |

---

## 🤖 Registro do Uso de Inteligência Artificial

- **Ferramenta utilizada:** IA gerativa de código.
- **Tarefas:** Estruturação inicial do projeto em camadas (`routes`, `controllers`, `services`), implementação das validações de entrada e geração do README explicativo.
- **Sugestão aceita/modificada:** A IA sugeriu criar tratamento centralizado de erros e uma estrutura desacoplada em 3 camadas, o que foi aceito e implementado para atender integralmente aos critérios de avaliação da disciplina.
