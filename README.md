# zaber.dev

A modern full-stack monorepo portfolio built with Deno, featuring a tRPC API backend and React frontend with Tailwind CSS.

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
- **Shadcn UI** (`packages/shadcn`): Shared UI component library

The project uses Deno as the runtime and package manager, deployed on Deno Deploy.

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

   - Create `.env.dev` in the root directory for local development
   - Create `.env.production` for production deployment

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

| Command                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `deno task dev`         | Start both API and web development servers concurrently |
| `deno task dev:api`     | Start only the API development server                   |
| `deno task dev:web`     | Start only the web development server                   |
| `deno task build:web`   | Build the web app for production                        |
| `deno task preview:web` | Preview the production build locally                    |
| `deno task serve:web`   | Serve the built web app using a file server             |
| `deno task db:generate` | Generate database migrations from schema changes        |
| `deno task db:migrate`  | Apply pending database migrations                       |
| `deno task test`        | Run all tests in the workspace                          |
| `deno task lint`        | Lint all code in the workspace                          |
| `deno task format`      | Format all code using Deno's formatter                  |
| `deno task deploy`      | Deploy both API and web to Deno Deploy                  |
| `deno task deploy:api`  | Deploy only the API to Deno Deploy                      |
| `deno task deploy:web`  | Deploy only the web app to Deno Deploy                  |

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
├── apps/               # Application code
│   ├── api/           # Backend API (tRPC + Drizzle)
│   └── web/           # Frontend web app (React + Vite)
├── packages/          # Shared packages
│   └── shadcn/       # UI component library
├── deno.json         # Root workspace configuration
└── README.md         # This file
```

### API Structure (`apps/api`)

```
api/
├── index.ts              # Entry point
├── server.ts             # Server configuration
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
│   ├── context.ts     # Request context
│   ├── middleware.ts  # Custom middleware
│   └── router.ts      # Router setup
└── utils/             # Shared utilities
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

This project uses [Deno Deploy](https://deno.com/deploy) for hosting.

### Prerequisites

1. **Install Deno Deploy CLI:**

```bash
deno install -Arf jsr:@deno/deployctl
```

2. **Authenticate:**

```bash
deployctl login
```

3. **Create projects on Deno Deploy:**
   - Create a project for the API (e.g., `zaber-api`)
   - Create a project for the web app (e.g., `zaber`)

### Deployment Steps

#### Deploy API

1. **Set environment variables:**

   - Create `.env.production` in the root directory
   - Or set them in the Deno Deploy dashboard

2. **Deploy:**

```bash
deno task deploy:api
```

This command:

- Deploys the API to the `zaber-api` project
- Uses the production environment file
- Includes only the `apps/api` directory
- Excludes `node_modules`

#### Deploy Web

1. **Build the app:**

```bash
deno task build:web
```

2. **Deploy:**

```bash
deno task deploy:web
```

This command:

- Builds the web app first
- Deploys to the `zaber` project
- Includes `apps/web` and `packages/**`
- Excludes `node_modules`

#### Deploy Both

To deploy both API and web simultaneously:

```bash
deno task deploy
```

### Continuous Deployment

For automated deployments:

1. **GitHub Integration:**

   - Link your GitHub repository in the Deno Deploy dashboard
   - Configure automatic deployments on push to `main` branch

2. **Custom Deploy Configuration:**

The deployment configuration is defined in the root [deno.json](deno.json):

```json
{
  "deploy": {
    "api": {
      "project": "zaber-api",
      "exclude": ["**/node_modules"],
      "include": ["apps/api"],
      "entrypoint": "apps/api/index.ts"
    },
    "web": {
      "project": "zaber",
      "exclude": ["**/node_modules"],
      "include": ["apps/web", "packages/shadcn"],
      "entrypoint": "apps/web/server.ts"
    }
  }
}
```

### Environment Variables

Make sure to set these in Deno Deploy dashboard or `.env.production`:

**API:**

- Database connection strings
- JWT secrets
- CORS allowed origins
- Any API keys

**Web:**

- API URL endpoint
- Any public environment variables

---

## License

This project is licensed under the MIT License.
