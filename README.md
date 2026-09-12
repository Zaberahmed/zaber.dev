# zaber.dev

A modern full-stack monorepo portfolio built with Deno, featuring a tRPC API backend and React frontend with Tailwind CSS. Both apps are deployed as a single Deno Deploy project serving from `zaber.deno.dev` — the web SPA at `/` and the tRPC API at `/api/*`.

## Table of Contents

1. [Summary](#summary)
2. [Getting Started](#getting-started)
3. [Available Commands](#available-commands)
4. [Project Architecture](#project-architecture)
5. [Tech Stack](#tech-stack)
6. [Adding New Apps or Packages](#adding-new-apps-or-packages)
7. [Deployment](#deployment)

---

## Summary

This project is a monorepo workspace that contains:

- **API** (`apps/api`): A tRPC-based backend with authentication, user management, and database integration using Drizzle ORM
- **Web** (`apps/web`): A React frontend built with Vite, TanStack Query, and Tailwind CSS
- **Server** (`apps/server`): The unified deployable. A single Deno.serve entrypoint that mounts the tRPC fetch handler at `/api/*` and serves the built web SPA at every other route.
- **Shadcn UI** (`packages/shadcn`): Shared UI component library
- **Constants** (`packages/constants`): Shared constants

`apps/api` and `apps/web` remain independent source-of-truth workspaces — they are composed by `apps/server` for production. The project uses Deno as the runtime and package manager, deployed on Deno Deploy.

---

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your machine (v1.40+)
- PostgreSQL database (for the API)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zaber.dev
```

2. Set up environment variables:

   - Create `.env` in the root directory for local development

3. Install dependencies:

```bash
deno install
```

4. Set up the database:

```bash
# Generate migrations
deno task db:generate

# Run migrations
deno task db:migrate
```

5. Start development servers:

```bash
deno task dev
```

This will start both the API and web servers concurrently.

---

## Available Commands

### Root Level Commands

| Command                   | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `deno task dev`           | Start both API and web development servers concurrently             |
| `deno task dev:api`       | Start only the API development server                               |
| `deno task dev:web`       | Start only the web development server                               |
| `deno task dev:server`    | Start the unified server (serves SPA + `/api`) locally              |
| `deno task build:web`     | Build the web app for production                                    |
| `deno task preview:web`   | Preview the production build locally                                |
| `deno task serve:web`     | Serve the built web app using a file server                         |
| `deno task db:generate`   | Generate database migrations from schema changes                    |
| `deno task db:migrate`    | Apply pending database migrations                                   |
| `deno task test`          | Run all tests in the workspace                                      |
| `deno task lint`          | Lint all code in the workspace                                      |
| `deno task format`        | Format all code using Deno's formatter                              |
| `deno task deploy`        | Deploy the unified app to Deno Deploy (`zaber.deno.dev`)            |
| `deno task deploy:server` | Same as `deno task deploy` — builds the web app and deploys the server |

### API-Specific Commands (from `apps/api`)

```bash
cd apps/api

# Start development server with hot reload
deno task dev

# Generate new migration file from schema changes
deno task db:generate

# Apply migrations to database
deno task db:migrate
```

### Web-Specific Commands (from `apps/web`)

```bash
cd apps/web

# Start development server
deno task dev

# Build for production
deno task build

# Preview production build
deno task preview

# Serve built files
deno task serve
```

---

## Project Architecture

### Overview

```
zaber.dev/
├── apps/                  # Application code
│   ├── api/              # Backend source (tRPC + Drizzle) — runnable standalone for dev
│   ├── web/              # Frontend source (React + Vite) — builds to apps/web/dist
│   └── server/           # Unified deployable — serves apps/web/dist + mounts tRPC at /api
├── packages/             # Shared packages
│   ├── shadcn/           # UI component library
│   └── constants/        # Shared constants
├── deno.json             # Root workspace configuration
└── README.md             # This file
```

### Runtime Routing (in production)

The unified `apps/server` entrypoint routes all incoming requests:

| Path                                | Handler                                    |
| ----------------------------------- | ------------------------------------------ |
| `/api`, `/api/<procedure>`          | tRPC fetch handler (mounted at `/api`)     |
| `/<anything>` with a file extension | Static asset from `apps/web/dist`          |
| `/`, `/home/`, `/about/`, ...       | `index.html` (SPA fallback for client routes) |

### API Structure (`apps/api`)

```
api/
├── index.ts              # Local dev entry point (runs standalone on :API_LOCAL_PORT)
├── server.ts             # Local dev server (standalone tRPC HTTP + CORS for proxy)
├── deno.json            # API-specific config & scripts
├── drizzle.config.ts    # Drizzle ORM configuration
├── constants/           # Global constants
├── db/                  # Database layer
│   ├── schema.ts       # Database schema definitions
│   ├── migrate.ts      # Migration runner
│   └── migrations/     # Generated migration files
├── modules/            # Feature modules
│   ├── auth/          # Authentication module
│   ├── user/          # User management module
│   └── health-check/  # Health check endpoints
├── trpc/              # tRPC configuration
│   ├── context.ts     # Request context (Fetch adapter types)
│   ├── middleware.ts  # Custom middleware
│   └── router.ts      # Router setup
└── utils/             # Shared utilities
```

### Server Structure (`apps/server`)

```
server/
├── deno.json            # Server workspace config
└── index.ts             # Unified Deno.serve entrypoint (tRPC + SPA)
```

### Web Structure (`apps/web`)

```
web/
├── server.ts           # Production server
├── index.html         # HTML template
├── deno.json         # Web-specific config & scripts
├── vite.config.ts    # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── src/
    ├── main.tsx          # Application entry point
    ├── App.tsx           # Root component
    ├── components/       # Reusable UI components
    ├── configs/          # Configuration files (tRPC, TanStack Query)
    ├── pages/           # Page components
    ├── routes/          # Route definitions
    ├── sections/        # Page sections (e.g., navbar)
    ├── providers/       # React context providers
    ├── entities/        # Type definitions & constants
    └── assets/          # Static assets
```

### Packages Structure

```
packages/
└── shadcn/
    ├── components.json     # Shadcn configuration
    ├── deno.json          # Package configuration
    └── src/
        ├── components/    # UI components
        │   ├── ui/       # Base UI components
        │   └── icons/    # Icon components
        ├── lib/          # Utility functions
        └── styles/       # Global styles
```

---

## Tech Stack

### Backend (API)

- **Runtime**: [Deno](https://deno.land/) - Modern, secure JavaScript/TypeScript runtime
- **API Framework**: [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM with SQL-like syntax
- **Database**: PostgreSQL
- **Authentication**: Jose (JWT tokens)
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation
- **CORS**: cors middleware

### Frontend (Web)

- **Framework**: [React 19](https://react.dev/) - UI library
- **Build Tool**: [Vite 6](https://vitejs.dev/) - Fast build tool and dev server
- **Router**: [React Router](https://reactrouter.com/) - Client-side routing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **API Client**: [tRPC Client](https://trpc.io/docs/client) with [TanStack Query](https://tanstack.com/query) - Data fetching and state management
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Animation library
- **Icons**: [Tabler Icons](https://tabler-icons.io/) - Icon library

### UI Components (Shadcn)

- **Component Library**: [Shadcn UI](https://ui.shadcn.com/) - Accessible, customizable component library
- **Base Components**: Built on Radix UI primitives
- **Styling**: Tailwind CSS with custom utilities

#### Adding a New Shadcn Component

Shadcn components are not installed via npm but copied into your codebase. Here's how to add a new component:

1. **Navigate to the shadcn package:**

```bash
cd packages/shadcn
```

2. **Add a component using the CLI:**

If you have the Shadcn CLI installed:

```bash
npx shadcn@latest add <component-name>
```

For example, to add a `card` component:

```bash
npx shadcn@latest add card
```

3. **Manual addition (alternative method):**

   - Visit [ui.shadcn.com](https://ui.shadcn.com/)
   - Navigate to the desired component's documentation
   - Copy the component code
   - Create a new file in `packages/shadcn/src/components/ui/`
   - Paste and adapt the code

4. **Export the component:**

Add the component to [packages/shadcn/src/components/ui/index.ts](packages/shadcn/src/components/ui/index.ts):

```typescript
export * from "./card";
```

5. **Use in your app:**

In your web app:

```typescript
import { Card, CardHeader, CardContent } from "@scope/shadcn/components/ui";

function MyComponent() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>Content here</CardContent>
    </Card>
  );
}
```

---

## Adding New Apps or Packages

### Adding a New App

1. **Create the app directory:**

```bash
mkdir -p apps/my-new-app
cd apps/my-new-app
```

2. **Create `deno.json` configuration:**

```json
{
  "name": "@scope/my-new-app",
  "tasks": {
    "dev": "deno run --allow-env --allow-net --watch index.ts"
  },
  "imports": {
    // Add your dependencies here
  }
}
```

3. **Create entry point (`index.ts`):**

```typescript
console.log("Hello from my new app!");
```

4. **Register in root workspace:**

Edit root [deno.json](deno.json) and add to the `workspace` array:

```json
{
  "workspace": [
    "apps/api",
    "apps/web",
    "apps/my-new-app" // Add this line
  ]
}
```

5. **Add workspace tasks:**

Add convenience tasks in root [deno.json](deno.json):

```json
{
  "tasks": {
    "dev:my-new-app": "deno task --cwd=apps/my-new-app dev"
  }
}
```

6. **Install dependencies:**

```bash
deno install
```

### Adding a New Package

1. **Create the package directory:**

```bash
mkdir -p packages/my-package/src
cd packages/my-package
```

2. **Create `deno.json` configuration:**

```json
{
  "name": "@scope/my-package",
  "version": "0.1.0",
  "exports": {
    ".": "./src/index.ts"
  },
  "imports": {
    // Add your dependencies
  }
}
```

3. **Create package code:**

```typescript
// packages/my-package/src/index.ts
export function myUtility() {
  return "Hello from my package!";
}
```

4. **Register in root workspace:**

Edit root [deno.json](deno.json):

```json
{
  "workspace": [
    "apps/api",
    "apps/web",
    "packages/shadcn",
    "packages/my-package" // Add this line
  ]
}
```

5. **Use in your apps:**

In any app's `deno.json`, add to imports:

```json
{
  "imports": {
    "@scope/my-package": "jsr:@scope/my-package"
  }
}
```

Then import in your code:

```typescript
import { myUtility } from "@scope/my-package";
```

---

## Deployment

This project uses [Deno Deploy](https://deno.com/deploy) for hosting as a single project.

### Prerequisites

1. **Install Deno Deploy CLI:**

   ```bash
   deno install -Arf jsr:@deno/deployctl
   ```

2. **Authenticate:**

   ```bash
   deployctl login
   ```

3. **Create a single project on Deno Deploy:**
   - Create a project named `zaber` (it will be available at `zaber.deno.dev`).
   - The old `zaber-api` project is no longer deployed and can be deleted from the dashboard.

### Deployment Steps

#### Deploy

```bash
deno task deploy
```

This command:

- Builds the web app (`deno task build:web`) so `apps/web/dist` is up to date.
- Deploys to the `zaber` project as a single application.
- Uses the production environment file (`.env.production`).
- Includes `apps/server`, `apps/api`, `apps/web/dist`, and `packages/constants`.
- Excludes `node_modules`.

#### Deploy Server Explicitly

```bash
deno task deploy:server
```

Equivalent to `deno task deploy`.

### Continuous Deployment

For automated deployments:

1. **GitHub Integration:**

   - Link your GitHub repository in the Deno Deploy dashboard for the `zaber` project.
   - Configure automatic deployments on push to `main` branch.

2. **Custom Deploy Configuration:**

The deployment configuration is defined in the root [deno.json](deno.json):

```json
{
  "deploy": {
    "server": {
      "project": "zaber",
      "exclude": ["**/node_modules"],
      "include": [
        "apps/server",
        "apps/api",
        "apps/web/dist",
        "packages/constants"
      ],
      "entrypoint": "apps/server/index.ts"
    }
  }
}
```

### Environment Variables

Set these in the Deno Deploy dashboard for the `zaber` project, or in `.env.production` at the root:

- `DEPLOYMENT_MODE` — `production` in deployed environments
- `JWT_SECRET` — JWT signing secret
- `ADMIN_SETUP_KEY` — Admin bootstrap key
- `DATABASE_URL` — Postgres connection string

CORS is no longer needed for web→API calls (same origin). The `CORS_ALLOWED_ORIGINS`, `VITE_API_URL`, and `API_PROXY_URL` variables from the previous split deployment are obsolete.

---

## License

This project is licensed under the MIT License.
