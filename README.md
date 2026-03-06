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

## Production env

Use a separate file on server:

```bash
cp .env.production.example .env.production
```

Then set real production credentials in `.env.production` (especially `DATABASE_URL`).

## Run

```bash
yarn start:dev
```

Health endpoint:

```bash
GET http://localhost:3000/health
```
