# Avantsoft Test — Backend

API desenvolvida em **NestJS** como parte do processo seletivo **Avantsoft**.

## ✅ Funcionalidades

- **CRUD de Produtos**
  - `POST /products` — cria produto com `name`, `price` e `sku`
  - `GET /products` — lista produtos ordenados por `name`
  - `GET /products/:id` — busca produto por ID
  - `PUT /products/:id` — atualiza produto
  - `DELETE /products/:id` — remove produto
- Validação:
  - `name` não pode ser vazio
  - `price` maior que zero
  - `sku` único
- Cada resposta de GET inclui:
  - `missingLetter`: primeira letra de A-Z ausente no `name`

## 🚀 Como rodar local

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run start:dev
