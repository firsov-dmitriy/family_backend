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

## Run

```bash
yarn start:dev
```

Health endpoint:

```bash
GET http://localhost:3000/health
```
