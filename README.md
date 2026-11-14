# devops-kt3

Simple Node.js (Express) app with a full CI/CD pipeline on GitHub Actions.

## Routes

| Method | Path      | Response              |
|--------|-----------|-----------------------|
| GET    | `/`       | `KT3 App` (text)      |
| GET    | `/health` | `{ "status": "ok" }`  |

## Local run

```bash
npm ci
npm run lint
npm test
npm start            # http://localhost:3000
```

## Docker

```bash
docker build -t devops-kt3 .
docker run -p 3000:3000 devops-kt3
```

## Pipeline (`.github/workflows/ci-cd.yml`)

`lint` → `test` (with `postgres:16-alpine` service + health check) → `build-and-push`
(only on push to `main`, publishes `ghcr.io/<owner>/devops-kt3:latest` and `:<commit sha>`).

Branches: `main` (protected, requires `lint` and `test` checks), `develop`, feature branches `feature/*`.
