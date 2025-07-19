# Avantsoft Test — Backend

API desenvolvida em **NestJS** como parte do processo seletivo **Avantsoft**.

---

## ✅ Funcionalidades

- **CRUD de Produtos**
  - `POST /products` — cria produto com `name`, `price` e `sku`
  - `GET /products` — lista produtos ordenados por `name`
  - `GET /products/:id` — busca produto por ID
  - `PUT /products/:id` — atualiza produto
  - `DELETE /products/:id` — remove produto
- **Validação**
  - `name` não pode ser vazio
  - `price` maior que zero
  - `sku` único
- Cada resposta de GET inclui:
  - `missingLetter`: primeira letra de A-Z ausente no `name`

---

## 🚀 Como rodar local

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run start:dev
```

A API roda em [http://localhost:3001](http://localhost:3001) (ou porta definida no `main.ts`).

---

## 📌 Exemplos de requisições

➜ **Criar produto**
```bash
curl -X POST http://localhost:3001/products   -H "Content-Type: application/json"   -d '{"name":"Example","price":10,"sku":"ABC123"}'
```

➜ **Buscar todos produtos**
```bash
curl http://localhost:3001/products
```

---

## ⚙️ Banco de dados

- Usa **SQLite** local (`db.sqlite`) com **TypeORM**
- `synchronize: true` para criar tabelas automaticamente

---

## ✅ Tecnologias

- NestJS
- TypeORM
- SQLite

---

**Desenvolvido por Adson Tanajura**  
🚀 Processo seletivo Avantsoft — 2025
