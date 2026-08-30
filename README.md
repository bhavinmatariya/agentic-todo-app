# Todo App

A full-stack Todo application with a Next.js (TypeScript + Tailwind CSS) frontend and an Express.js (TypeScript) backend.

## Project Structure

```text
.
├── frontend/       # Next.js + TypeScript + Tailwind CSS frontend
├── backend/        # Express.js + TypeScript backend
├── .gitignore
└── README.md
```

## Frontend Setup

The frontend lives in the `frontend/` directory and is built with Next.js, TypeScript, and Tailwind CSS.

### Install dependencies

```bash
cd frontend
npm install
```

### Configure environment variables

Copy `.env.example` to `.env.local` and adjust values as needed:

```bash
cp .env.example .env.local
```

### Run the development server

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Backend Setup

The backend lives in the `backend/` directory and is built with Express.js and TypeScript.

### Install dependencies

```bash
cd backend
npm install
```

### Configure environment variables

Copy `.env.example` to `.env` and adjust values as needed:

```bash
cp .env.example .env
```

`DATABASE_URL` must point to a running PostgreSQL instance, for example:

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_app?schema=public"
```

### Database Setup

The backend uses [Prisma](https://www.prisma.io/) as its ORM, with a PostgreSQL `users` table storing id, name, email, password hash, and timestamps.

Generate the Prisma client and run the migrations against your database:

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the development server

```bash
npm run dev
```

The backend will be available at [http://localhost:5000](http://localhost:5000).

### Health check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok" }
```

## Running Both Applications

The frontend and backend are independent applications and can be started separately, each in its own terminal:

```bash
# Terminal 1 - backend
cd backend && npm run dev

# Terminal 2 - frontend
cd frontend && npm run dev
```
