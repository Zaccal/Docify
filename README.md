# Docify

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, and more.

This project is a web application for automating the generation of Excel documents for my family business.

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

## Isolated Database setup for testing

To set up an isolated database for testing,
run the following command:

```bash
bun run db:test:up
```

To tear down the isolated database:

```bash
bun run db:test:down
```

### ALSO DO NOT FORGET SET UP ENVIRONMENT VARIABLES

Create a `.env` file in the `apps/web` directory with the following content:

```env
CORS_ORIGIN=
DATABASE_URL=LOCAL DB FOR DEV
PASSWORD=PASSWORD FOR LOGIN
AUTH_SECRET==GENERATED SECRET
TEMPLATE_DIR='templates'
EXCEL_SERVICE_URL="http://localhost:PORT"
```

Create a `.env.test` file in the `apps/web` directory with the same following content as `.env` but with the `DATABASE_URL` set to the test database.

Create a `.env` file in the `apps/excel-service` directory with the following content:

```env
PORT=
TEMPLATE_PATH=templates
```

## E2E Testing

Before running E2E tests, ensure the test database is set up by following the instructions above in "Isolated Database setup for testing":

for running E2E tests you can use the `bun run cypress:run` command.
or `bun run cypress:open` to run the Cypress test runner in interactive mode.

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
