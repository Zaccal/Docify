# Docify

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, and more.

This project is a web application for automating the generation of Excel/DOCS documents for my family business.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - Base UI primitives live in `packages/ui`
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Husky** - Git hooks for code quality
- **Turborepo** - Optimized monorepo build system
- **Go** - Microservice for generating Excel documents

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
bun run db:push
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## Testing

Docify uses **Cypress** for end-to-end (E2E) testing and **Testcontainers** to provide an isolated PostgreSQL database.

### Environment Variables

Before running the application, create `.env` in `apps/web`:

```env
CORS_ORIGIN=
DATABASE_URL=LOCAL_DB_CONNECTION_URL
PASSWORD=PASSWORD_FOR_LOGIN
AUTH_SECRET=GENERATED_SECRET
TEMPLATE_DIR=templates
EXCEL_SERVICE_URL=http://localhost:PORT
```

The Excel service requires its own `.env` file in `apps/excel-service`:

```env
PORT=
TEMPLATE_PATH=templates
```

### E2E Testing

The E2E test runner uses **Testcontainers** to automatically create a temporary PostgreSQL database for each test run. You do not need to create a separate test database or `.env.test` file.

The test database connection URL is generated automatically by Testcontainers and passed to the Next.js application and database migrations.

#### Run E2E Tests

```bash
bun run e2e:run
```

This command:

1. Starts a PostgreSQL container using Testcontainers.
2. Creates the test database.
3. Runs the database migrations.
4. Starts the Next.js development server.
5. Waits for Next.js to become available.
6. Runs Cypress tests.
7. Stops the Next.js server.
8. Removes the PostgreSQL container.

This is the recommended command for **CI and automated E2E testing**.

#### Open Cypress

```bash
bun run e2e:open
```

This starts the E2E environment and opens Cypress in interactive mode, allowing tests to be run and debugged manually.

### Cypress Environment Variables

Cypress uses `cypress.env.json` for values required by the tests.

Create `cypress.env.json` in the project root:

```json
{
  "PASSWORD": "PASSWORD_FOR_LOGIN"
}
```

The `PASSWORD` value should match the `PASSWORD` configured in `apps/web/.env`.

> **Do not commit `cypress.env.json` if it contains real credentials.** Add it to `.gitignore` if necessary.

### Running Cypress Directly

Cypress can also be run without the E2E runner:

```bash
bun run cypress:run
```

Or opened in interactive mode:

```bash
bun run cypress:open
```

These commands only run Cypress. They do **not** start Testcontainers or Next.js automatically, so the required application and database must already be running.

### E2E Runner Scripts

The E2E runner scripts are located in:

```text
cypress/
└── runner/
    └── scripts/
        ├── ci.ts
        └── default.ts
```

The corresponding package scripts are:

```json
{
  "e2e:run": "bun ./cypress/runner/scripts/ci.ts",
  "e2e:open": "bun ./cypress/runner/scripts/default.ts"
}
```

## Excel Service

The Excel service is a Go microservice that generates Excel documents from templates.

Requirements:

- Go (version 1.21 or higher)
- Air (for live reloading)

To run the Excel service:

```bash
cd apps/excel
bun run dev
```

## UI Customization

React web apps in this stack share Base UI primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Shared components are exported from `@Docify/ui/components/*`

### Add more shared components

Install or wrap additional Base UI primitives in `packages/ui/src/components`.

```bash
bun add @base-ui/react --filter @Docify/ui
```

Import shared components like this:

```tsx
import { Button } from '@Docify/ui/components/button'
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, keep them inside `apps/web`.

## Deployment

### Docker Compose

- Target: web + server
- Config: `docker-compose.yml` (app Dockerfiles live in `apps/*/Dockerfile`)
- Build images: bun run docker:build
- Start: bun run docker:up
- Logs: bun run docker:logs
- Stop: bun run docker:down

Environment variables are read from each app's `.env` file (baked into web builds for public variables) and overridden in `docker-compose.yml` for container networking.

## Git Hooks and Formatting

- Initialize hooks: `bun run prepare`

## Project Structure

```
Docify/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── ui/          # Shared Base UI components and styles
│   └── db/          # Database schema & queries
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run db:push`: Push schema changes to database
- `bun run db:generate`: Generate database client/types
- `bun run db:migrate`: Run database migrations
- `bun run db:studio`: Open database studio UI
- `bun run docker:build`: Build the Docker Compose images
- `bun run docker:up`: Build and start the Docker Compose stack
- `bun run docker:logs`: Tail logs from the Docker Compose stack
- `bun run docker:down`: Stop the Docker Compose stack
