<p align="center">
  <img src="docify-previews/Banner.png" alt="Docify — automate your business documents" width="100%" />
</p>

<h1 align="center">Docify</h1>

<p align="center">
  <strong>Less paperwork. More time for the business.</strong><br />
  Generate Excel and Word documents, manage clients, and keep daily operations in one place.<br />
  Built for my family's business.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-18181B?style=flat-square&amp;logo=nextdotjs&amp;logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-705184?style=flat-square&amp;logo=typescript&amp;logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Go-705184?style=flat-square&amp;logo=go&amp;logoColor=white" alt="Go" />
  <img src="https://img.shields.io/badge/PostgreSQL-705184?style=flat-square&amp;logo=postgresql&amp;logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Bun-18181B?style=flat-square&amp;logo=bun&amp;logoColor=white" alt="Bun" />
</p>

<p align="center">
  <a href="#preview">Preview</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="#testing">Testing</a> ·
  <a href="#deployment">Deployment</a>
</p>

---

## Preview

A look inside Docify. Click any screenshot to view it at full size.

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="docify-previews/preview-1.png">
        <img src="docify-previews/preview-1.png" alt="Docify dashboard with document totals, client and organization counts, and an activity chart" width="100%" />
      </a>
      <p><strong>Business at a glance</strong><br />Document totals, recent activity, and client insights.</p>
    </td>
    <td width="50%" valign="top">
      <a href="docify-previews/preview-4.png">
        <img src="docify-previews/preview-4.png" alt="Document creation form with template selection, client details, and organization information" width="100%" />
      </a>
      <p><strong>From details to documents</strong><br />Choose a template, fill in the details, or reuse an existing document.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="docify-previews/preview-2.png">
        <img src="docify-previews/preview-2.png" alt="Searchable operations table showing clients, organizations, statuses, and amounts" width="100%" />
      </a>
      <p><strong>Every operation in view</strong><br />Search activity and review statuses, clients, and amounts.</p>
    </td>
    <td width="50%" valign="top">
      <a href="docify-previews/preview-3.png">
        <img src="docify-previews/preview-3.png" alt="Operation action menu with options to view, return, recreate, or ignore an operation" width="100%" />
      </a>
      <p><strong>Actions within reach</strong><br />View, return, recreate, or ignore an operation from its menu.</p>
    </td>
  </tr>
</table>

A full-stack document automation platform built for a real family business workflow.

- **Document generation** — Create Excel and Word documents from reusable templates.
- **Faster data entry** — Prefill a new document using an existing one.
- **Client and organization management** — Keep business details together for recurring work.
- **Operations history** — Search records and track statuses and amounts.
- **Dashboard overview** — See document totals, client counts, and activity over time.
- **Shared design system** — A consistent interface built with Base UI and Tailwind CSS.

## Tech Stack

| Layer               | Technologies                                          |
| ------------------- | ----------------------------------------------------- |
| Web application     | Next.js, React, TypeScript                            |
| UI and styling      | Tailwind CSS, Base UI, shared `@Docify/ui` components |
| Data                | PostgreSQL, Drizzle ORM                               |
| Document generation | Go with Excelize for Excel; Docxtemplater for Word    |
| Workspace           | Bun, Turborepo                                        |
| Testing             | Cypress, Testcontainers                               |
| Code quality        | Oxfmt, Oxlint, Husky                                  |

[Features](#-features) · [Architecture](#-architecture) · [Getting started](#-getting-started) · [Testing](#-testing) · [Deployment](#-deployment)

### Prerequisites

- **Bun** — The version pinned in `package.json`.
- **PostgreSQL** — A running database for local development.
- **Go** — The version specified in `apps/excel-service/go.mod` or newer.
- **Air** — Live reloading for the Go service.
- **Docker** — Required for the Testcontainers E2E runner and Docker Compose deployment.

### 1. Install dependencies

Run from the repository root:

```bash
bun install
```

### 2. Configure the environment

Create `apps/web/.env`:

```env
CORS_ORIGIN=http://localhost:3001
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/docify
PASSWORD=YOUR_LOGIN_PASSWORD
AUTH_SECRET=YOUR_GENERATED_SECRET
TEMPLATE_DIR=templates
EXCEL_SERVICE_URL=http://localhost:3002
```

Replace the database credentials, login password, and auth secret with your own values.

Create `apps/excel-service/.env`:

```env
PORT=3002
TEMPLATE_PATH=templates
```

### 3. Set up the database

Apply the schema to your local PostgreSQL database:

```bash
bun run db:push
```

### 4. Start development

```bash
bun run dev
```

Open **[localhost:3001](http://localhost:3001)**. Turborepo starts the Next.js app and the Go Excel service together.

To start only the web application:

```bash
bun run dev:web
```

## Testing

Docify uses **Cypress** for end-to-end tests and **Testcontainers** for an isolated PostgreSQL database.

Create `cypress.env.json` in the repository root:

```json
{
  "PASSWORD": "YOUR_LOGIN_PASSWORD"
}
```

Use the same password as `apps/web/.env`. This file is already excluded by `.gitignore`.

| Command            | Use                                                                     |
| ------------------ | ----------------------------------------------------------------------- |
| `bun run e2e:run`  | Run the complete E2E environment and tests for CI or local verification |
| `bun run e2e:open` | Start the E2E environment and open interactive Cypress                  |

The runner creates a temporary PostgreSQL database, applies migrations, starts the development services, waits for Next.js, and launches Cypress. It handles cleanup after the run. The database URL is supplied automatically; a separate test database or `.env.test` file is not needed.

<details>
<summary><strong>Run Cypress against an existing environment</strong></summary>

These commands run Cypress only. Start the application, Excel service, and database first.

```bash
bun run cypress:run
bun run cypress:open
```

</details>

<details>
<summary><strong>E2E runner scripts</strong></summary>

```text
cypress/
└── runner/
    ├── runner.ts
    ├── utils.ts
    └── scripts/
        ├── ci.ts          # bun run e2e:run
        └── default.ts     # bun run e2e:open
```

</details>

The value must match `PASSWORD` in `apps/web/.env`. Do not commit real credentials.

The Go microservice generates Excel documents from templates stored in `apps/excel-service/templates`.

With Go, Air, and the service's `.env` configured, run it independently:

```bash
cd apps/excel-service
bun run dev
```

The web app connects through `EXCEL_SERVICE_URL`, which should match the service's `PORT`.

## UI Customization

Shared Base UI primitives and styles live in `packages/ui`.

| Change                          | Location                             |
| ------------------------------- | ------------------------------------ |
| Design tokens and global styles | `packages/ui/src/styles/globals.css` |
| Shared components               | `packages/ui/src/components/`        |
| App-specific blocks             | `apps/web/`                          |

Add or wrap Base UI primitives in the shared package:

## 🎨 UI development

Import shared components using the package exports:

```tsx
import { Button } from '@Docify/ui/components/button'
```

## Deployment

Docker Compose runs the **web app**, **Excel service**, and **Nginx** using `docker-compose.yml`. Application Dockerfiles live in `apps/web` and `apps/excel-service`.

Configure the app environment files and set `DATABASE_URL` in the root `.env` for Compose. Container networking overrides are defined in `docker-compose.yml`; the production proxy configuration lives in `deployment/nginx/nginx.prod.conf`.

| Command                | Action                                      |
| ---------------------- | ------------------------------------------- |
| `bun run docker:build` | Build application images                    |
| `bun run docker:up`    | Build and start the stack in the background |
| `bun run docker:logs`  | Follow stack logs                           |
| `bun run docker:down`  | Stop the stack                              |

<div align="center">

```text
Docify/
├── apps/
│   ├── web/               # Next.js application and Word templates
│   └── excel-service/     # Go service and Excel templates
├── packages/
│   ├── config/            # Shared configuration
│   ├── db/                # Database schema and migrations
│   ├── env/               # Environment validation
│   └── ui/                # Shared Base UI components and styles
├── cypress/               # E2E tests and environment runner
├── deployment/            # Nginx and deployment configuration
├── docify-previews/       # README banner and screenshots
└── docker-compose.yml
```

## Available Scripts

Run these commands from the repository root.

| Command               | Action                                          |
| --------------------- | ----------------------------------------------- |
| `bun run dev`         | Start all applications in development mode      |
| `bun run dev:web`     | Start only the web application                  |
| `bun run build`       | Build all applications                          |
| `bun run check-types` | Run the workspace type-check task               |
| `bun run lint`        | Check code with Oxlint                          |
| `bun run fmt`         | Format files with Oxfmt                         |
| `bun run fmt:check`   | Check formatting without changing files         |
| `bun run db:push`     | Push schema changes to the database             |
| `bun run db:generate` | Generate SQL migrations from the Drizzle schema |
| `bun run db:migrate`  | Apply database migrations                       |
| `bun run db:studio`   | Open Drizzle Studio                             |
| `bun run prepare`     | Initialize Husky Git hooks                      |

---

<p align="center">
  Built for the family business · Scaffolded with
  <a href="https://github.com/AmanVarshney01/create-better-t-stack">Better-T-Stack</a>
</p>
