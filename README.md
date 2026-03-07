# Family Backend (NestJS + PostgreSQL)

## Requirements

- Node.js 20+
- PostgreSQL 14+

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update PostgreSQL connection params in `.env`.
   Recommended:

```bash
DATABASE_URL=postgres://app_user:password@localhost:5432/app_db
```

For production, also use `.env` on server and set real credentials there.

Database schema is managed by TypeORM migrations (`POSTGRES_SYNCHRONIZE=false`).

## Run

```bash
yarn start:dev
```

Health endpoint:

```bash
GET http://localhost:3000/api/health
```

Swagger:

```bash
http://localhost:3000/api/docs
```

Wishlist routes:

```bash
POST   /api/wishlists
GET    /api/wishlists
GET    /api/wishlists/:id
PATCH  /api/wishlists/:id
DELETE /api/wishlists/:id
```

Expense categories routes:

```bash
POST   /api/expense-categories
GET    /api/expense-categories
GET    /api/expense-categories/:id
PATCH  /api/expense-categories/:id
DELETE /api/expense-categories/:id
```

Expenses routes:

```bash
POST   /api/expenses
GET    /api/expenses
GET    /api/expenses/:id
PATCH  /api/expenses/:id
DELETE /api/expenses/:id
GET    /api/expenses/month-summary?month=3
PATCH  /api/expenses/month-limit
```

Migrations:

```bash
yarn migration:run
yarn migration:revert
```
