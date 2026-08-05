# QuizNest — Online Quiz Application

GUVI-HCL Full Stack Assignment. A Spring Boot REST API backend paired with a Next.js frontend, split so each half deploys independently: **backend on Render**, **frontend on Vercel**.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.2, Spring Security + JWT, Spring Data JPA, PostgreSQL
- **Frontend:** Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Zod, Server Actions
- **Auth:** Stateless JWT issued by the backend; the frontend stores it in an httpOnly cookie via a BFF pattern (Server Actions/Route Handlers), never exposed to client JS
- **Database:** PostgreSQL

## Project Structure

```
Online Quiz Application/
├── backend/            Spring Boot REST API
│   ├── src/
│   ├── sql/             manual reference schema (optional — JPA auto-creates tables)
│   ├── Dockerfile
│   ├── docker-compose.yml   local Postgres for dev
│   └── render.yaml       Render blueprint
├── frontend/            Next.js app
│   └── src/
│       ├── app/          routes (public, /admin, /participant)
│       ├── components/
│       ├── lib/           API client, session/JWT helpers, Server Actions
│       └── types/
└── README.md
```

## Local Development

### Backend

```bash
cd backend
docker compose up -d          # starts Postgres on localhost:5433
./mvnw spring-boot:run         # or: ./mvnw clean package && java -jar target/*.jar
```

Runs on `http://localhost:8080`. Sample accounts are seeded on first run:

| Role        | Email            | Password  |
|-------------|------------------|-----------|
| ADMIN       | admin@quiz.com   | admin123  |
| PARTICIPANT | john@quiz.com    | john123   |

Config is entirely env-var driven (see `backend/src/main/resources/application.properties`) with sane local defaults — no manual setup needed beyond `docker compose up`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000` and expects the backend at `BACKEND_URL` (defaults to `http://localhost:8080`, see `frontend/.env.local`).

### Tests

```bash
cd backend && ./mvnw test
cd frontend && npx tsc --noEmit && npx eslint . && npx next build
```


## Features

### Admin
- Dashboard with stats, quiz CRUD, question CRUD per quiz, registered user list

### Participant
- Browse quizzes, take a quiz with a countdown timer, instant scoring on submit
- Score history with a chart, profile update

### Auth & Security
- BCrypt password hashing, stateless JWT (HS384), role-based route/API authorization
- Correct answers are never sent to participants before submission
- Frontend never exposes the JWT to client-side JS (httpOnly cookie only)
