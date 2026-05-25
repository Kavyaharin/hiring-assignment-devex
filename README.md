## Deployment Insights — DevEx Technical Case

Stateless deployment analytics microservice

---

## Architecture

```text
MongoDB
   ↑
Deployment Registry API (.NET)
   ↑
Deployment Insights API (Node.js / TypeScript)
```

---

## Services

| Service | Technology | Port | Purpose |
|---|---|---|---|
| deployment-registry | .NET + MongoDB | 7080 | Source deployment API |
| deployment-insights | Node.js + TypeScript | 7081 | Aggregation and analytics API |
| MongoDB | MongoDB | 27017 | Persistence layer |

---

## Prerequisites

| Requirement | Version |
|---|---|
| Docker Desktop | Latest |
| Docker Compose | Latest |
| Node.js | 20+ |
| VS Code Dev Containers | Optional |

---

## Quick Onboarding

A new developer can get the project running in a few minutes using either:

- Docker Compose
- VS Code Devcontainer

Recommended setup:

```bash
docker-compose up --build
```

This starts:

- MongoDB
- Deployment Registry API
- Deployment Insights API

---

## Docker Compose

Starts MongoDB, Deployment Registry API, and Deployment Insights API.

| Action | Command |
|---|---|
| Start services | `docker-compose up --build` |
| Run in background | `docker-compose up -d` |
| Stop services | `docker-compose down` |
| View logs | `docker-compose logs -f` |

---

## Development & Validation Workflow

```bash
# Start MongoDB
docker run -d --name mongo-devex -p 27017:27017 mongo

# Import seed data
docker cp seed-data.json mongo-devex:/seed-data.json

docker exec -it mongo-devex bash

mongoimport \
  --db deployment-registry \
  --collection deployments \
  --jsonArray \
  --file /seed-data.json

# Start Deployment Registry API
dotnet run

# Verify Registry API
curl http://localhost:5176/api/deployments

# Start Deployment Insights API
npx ts-node src/server.ts

# Verify service health
curl http://localhost:7081/health

# Validate analytics endpoints
curl http://localhost:7081/insights/latest
```

---

## Implemented Endpoints & Purpose

| Endpoint | Description |
|---|---|
| GET /health | Health check including Registry API reachability |
| GET /insights/frequency | Deployment frequency per service |
| GET /insights/lead-time | Average deployment lead time |
| GET /insights/failure-rate | Failure and rollback rate |
| GET /insights/latest | Latest deployed version per service/environment |

---

## Testing

| Action            | Command                    |
| ----------------- | -------------------------- |
| Unit Tests        | `npm test`                 |
| Linting           | `npm run lint`             |
| Integration Tests | `npm run test:integration` |

---

## CI/CD

| Workflow | Purpose |
|---|---|
| GitHub Actions | Continuous integration pipeline |
| Automated Tests | Validate aggregation and integration logic |
| Docker Image Build | Container packaging |
| GHCR Publishing | Container registry publishing |

---

## Devcontainer Support

This repository includes a VS Code Dev Container configuration for a fully reproducible development environment.

Prerequisites: VS Code, Dev Containers extension, and Docker Desktop.

1. Open the repository in VS Code

2. Run:

```text
Dev Containers: Reopen in Container
```

The environment will automatically provision:

- Node.js
- .NET SDK
- Docker tooling
- Project dependencies

This enables contributors to start developing without manual local environment setup.

---

## Developer Experience Improvements

| Improvement | Description |
|---|---|
| Devcontainer | Reproducible development environment |
| Husky Hooks | Pre-commit quality checks |
| ESLint Flat Config | Modern lint configuration |
| Docker Compose | Simplified local orchestration |
| Centralized Error Handling | Consistent API error responses |
| Strict TypeScript | Improved type safety |
| Repository Cleanup | Removed generated artifacts and redundant files |

---

## Assumptions & Tradeoffs

| Area | Decision |
|---|---|
| Service Design | Insights service remains stateless |
| Data Source | Registry API acts as single source of truth |
| Scope Prioritization | Focused on operational baseline and developer experience |

---

## Additional Improvements(With More Time)

- Redis caching for Registry API responses
- Kubernetes deployment manifests
- Retry and resilience handling



