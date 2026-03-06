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

## Run

```bash
yarn start:dev
```

Health endpoint:

```bash
GET http://localhost:3000/health
```

Swagger:

```bash
http://localhost:3000/docs
```

Wishlist routes:

```bash
POST   /wishlists
GET    /wishlists
GET    /wishlists/:id
PATCH  /wishlists/:id
DELETE /wishlists/:id
```
