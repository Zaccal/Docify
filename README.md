<div align="center">

# Docify

**Generate consistent Excel and Word documents from reusable templates — without repetitive manual work.**

A full-stack document automation platform built for a real family business workflow.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-Excel_service-00ADD8?logo=go&logoColor=white)](https://go.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3-FBF0DF?logo=bun&logoColor=14151A)](https://bun.sh/)
[![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![Cypress](https://img.shields.io/badge/Cypress-E2E-69D3A7?logo=cypress&logoColor=white)](https://www.cypress.io/)

[Features](#-features) · [Architecture](#-architecture) · [Getting started](#-getting-started) · [Testing](#-testing) · [Deployment](#-deployment)

</div>

---

## ✨ Features

- **Template-driven generation** — produce Excel and DOCX documents from structured form data.
- **Centralized customer data** — save and reuse customer and organization details with PostgreSQL.
- **Consistent calculations** — calculate dates, nights, totals, and formatted document values in one place.
- **Ready-to-download bundles** — generate the related documents together for a workflow.
- **Shared design system** — reusable Base UI components and Tailwind CSS styles across the web app.
- **Isolated E2E tests** — Cypress runs against a disposable PostgreSQL database through Testcontainers.
- **Containerized delivery** — Docker Compose, Nginx, and separate web and Excel-generation services.

## 🧱 Architecture

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Web application | Next.js 16, React 19, TypeScript | Forms, validation, document workflows, and downloads |
| Excel service | Go | Generates Excel files from templates |
| Database | PostgreSQL, Drizzle ORM | Customers, organizations, documents, and migrations |
| UI | Base UI, Tailwind CSS 4 | Shared components, themes, and design tokens |
| Monorepo | Bun, Turborepo | Workspaces, scripts, caching, and builds |
| Quality | Cypress, Testcontainers, Oxc, Husky | E2E testing, linting, formatting, and Git hooks |

```text
Docify/
├── apps/
│   ├── web/                # Next.js full-stack application
│   └── excel-service/      # Go Excel-generation service
├── packages/
│   ├── config/             # Shared TypeScript configuration
│   ├── db/                 # Drizzle schema, queries, and migrations
│   ├── env/                # Typed environment configuration
│   └── ui/                 # Shared Base UI components and styles
├── cypress/                # E2E specs, helpers, tasks, and runners
├── deployment/             # Nginx and deployment configuration
└── docker-compose.yml      # Production-oriented service stack
```

## 🚀 Getting started

### Prerequisites

- [Bun](https://bun.sh/) 1.3+
- [PostgreSQL](https://www.postgresql.org/)
- [Go](https://go.dev/) for running the Excel service locally
- [Docker](https://www.docker.com/) for containers and E2E tests

### 1. Clone and install

```bash
git clone https://github.com/Zaccal/Docify.git
cd Docify
bun install
```

### 2. Configure the web app

Create `apps/web/.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/docify
PASSWORD=your_login_password
AUTH_SECRET=your_generated_secret
CORS_ORIGIN=http://localhost:3001
TEMPLATE_DIR=templates
EXCEL_SERVICE_URL=http://localhost:3002
```

> Keep real credentials out of Git. Use local values for development and repository/environment secrets in CI.

### 3. Configure the Excel service

Create `apps/excel-service/.env`:

```env
PORT=3002
TEMPLATE_PATH=templates
```

### 4. Prepare the database

Make sure PostgreSQL is running, then apply the schema:

```bash
bun run db:push
```

### 5. Start development

Start the monorepo:

```bash
bun run dev
```

The web app is available at [http://localhost:3001](http://localhost:3001).

To run only the web workspace:

```bash
bun run dev:web
```

## 🧪 Testing

Docify uses Cypress for end-to-end testing and Testcontainers for a clean PostgreSQL instance on every complete E2E run.

### Headless E2E run

```bash
bun run e2e:run
```

The runner starts PostgreSQL, applies migrations, launches the app, runs Cypress, and cleans up the temporary environment.

### Interactive E2E mode

```bash
bun run e2e:open
```

Create `cypress.env.json` in the repository root when local tests need a login password:

```json
{
  "PASSWORD": "your_login_password"
}
```

The value must match `PASSWORD` in `apps/web/.env`. Do not commit real credentials.

You can also run Cypress directly when the application and database are already running:

```bash
bun run cypress:run
bun run cypress:open
```

## 🐳 Deployment

The production Compose stack contains the web app, Excel service, and Nginx reverse proxy.

```bash
bun run docker:build   # Build images
bun run docker:up      # Build and start the stack
bun run docker:logs    # Follow service logs
bun run docker:down    # Stop the stack
```

Runtime values come from the application environment files and Compose environment overrides. TLS and Nginx configuration live under `deployment/`.

## 🛠️ Useful scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start all workspaces in development mode |
| `bun run dev:web` | Start only the Next.js app |
| `bun run build` | Build all workspaces |
| `bun run check-types` | Type-check the monorepo |
| `bun run lint` | Run Oxc linting |
| `bun run lint:fix` | Fix supported lint issues |
| `bun run fmt` | Format the repository |
| `bun run fmt:check` | Check formatting without changing files |
| `bun run db:push` | Push the Drizzle schema |
| `bun run db:generate` | Generate a database migration |
| `bun run db:migrate` | Run database migrations |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run e2e:run` | Run the complete headless E2E environment |

## 🎨 UI development

Shared primitives live in `packages/ui/src/components`, while design tokens and global styles live in `packages/ui/src/styles/globals.css`.

```tsx
import { Button } from '@Docify/ui/components/button'
```

Keep reusable primitives in `packages/ui` and feature-specific blocks inside `apps/web`.

## 🤝 Contributing

1. Create a focused branch.
2. Make the change and add or update tests.
3. Run the quality checks:

```bash
bun run fmt:check
bun run lint
bun run check-types
bun run e2e:run
```

4. Open a pull request with a clear description of the change.

---

<div align="center">

Built with **Next.js**, **Go**, **PostgreSQL**, and a little obsession with eliminating repetitive paperwork.

</div>
