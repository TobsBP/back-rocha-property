# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Fastify 5 + TypeScript (ESM) + Drizzle ORM (PostgreSQL) + Firebase Admin auth. Validation/serialization via TypeBox. API docs served at `/docs` (Scalar UI) and `/openapi.json`. Linting/formatting via Biome.

## Commands

```bash
npm run dev            # tsx watch — local dev server
npm run build          # tsc + tsc-alias (resolves @/* path aliases in dist)
npm start              # run compiled dist/server.js
npm run type-check     # tsc --noEmit

npm run lint           # biome check --write . (lint + format + organize imports, autofix)

npm test               # vitest run (all tests)
npm run test:watch     # vitest watch
npm run test:coverage  # vitest with v8 coverage
npx vitest run src/modules/properties/services/properties.service.test.ts  # single file
npx vitest run -t "should throw NotFoundError"                             # single test by name

npm run db:generate    # drizzle-kit generate (create migration from schema changes)
npm run db:migrate     # drizzle-kit migrate (apply migrations in ./drizzle)

npm run generate:module <name>   # scaffold a new 5-layer module (e.g. products)
```

## Architecture

Layered, module-based, with Awilix dependency injection.

**Request flow:** `routes → controller → service → repository → db`. Each module owns these layers under `src/modules/<name>/`:
- `schemas/` — TypeBox schemas; route validation + serialization, and the source of static types (`Static<typeof X>`).
- `routes/` — registers Fastify routes, resolves its controller from the DI container, attaches schemas and preHandlers.
- `controllers/` — thin HTTP adapters (parse request, call service, set status/send). No business logic.
- `services/` — business logic; throws domain errors from `@/core/errors`.
- `repositories/` — Drizzle queries only.
- `interfaces/` — `I*Service` / `I*Repository` contracts that services/repos implement and consume.

**Dependency injection** (`src/core/di/container.ts`): Awilix in `PROXY` mode — classes receive a single destructured object of their named dependencies (e.g. `constructor({ propertiesService })`). Every new repository/service/controller must be registered here as a singleton. Routes get their controller via `container.resolve<T>('<name>Controller')`.

**Registering a module:** add its `routes` register call in `src/modules/index.ts` (with a path prefix) and register its classes in the DI container.

**Bootstrap** (`src/server.ts`): registers cors → multipart (10 MB limit) → helmet → swagger → error-handler → firebase-auth → app modules, then `listen`. Plugin order matters; auth and error-handler must be registered before the modules. Graceful shutdown closes Fastify and the DB pool on SIGINT/SIGTERM.

**Database** (`src/infra/db/`): `client.ts` exposes `getDb()` (lazy singleton pool) and `closeDb()`. Schema lives in `schema/*.ts` and is re-exported from `schema/index.ts`, which `drizzle.config.ts` points at. After editing a schema file, run `db:generate` then `db:migrate`.

## Auth & authorization

- Global `onRequest` hook in `src/infra/plugins/firebase-auth.plugin.ts` verifies the `Authorization: Bearer <firebase-id-token>` header, looks the user up by email in the `users` table, and populates `request.authUser` (`{ id, email, name, role }`).
- **Public routes** opt out with `config: { isPublic: true }` on the route (used by `/auth/sign-in` and `/auth/sign-up`). `/docs` and `/openapi.json` are always public.
- **Admin-only routes** use `preHandler: requireAdmin` (`src/shared/hooks/require-admin.hook.ts`), which checks `request.authUser.role === 'admin'`.
- The `auth` module signs in/up against Firebase's REST API (needs `FIREBASE_API_KEY`) and returns a token; the rest of auth is handled by the Firebase Admin SDK (needs `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).

## Conventions

- **ESM imports must use `.js` extensions** even for `.ts` files (NodeNext resolution). Use the `@/*` alias for `src/*`.
- **Errors:** throw the typed errors from `@/core/errors` (`NotFoundError`, `ConflictError`, `UnauthorizedError`, `ForbiddenError`, or `AppError`). The error-handler plugin converts them to the standard error shape `{ statusCode, error, message, details? }`.
- **Response shapes:** success returns the object/array directly; paginated lists return `{ data, meta: { total, page, limit, totalPages } }` (build with `PaginatedResponse(...)` and `PaginationQuerySchema` from `src/shared/schemas/common.ts`).
- **Tests:** Vitest with globals enabled; service tests mock the repository interface. Biome linting is disabled for `*.test.ts`. `e2e` dirs are excluded from the test run.
- **Formatting (Biome):** tabs, single quotes, organized imports — just run `npm run lint`.
- **Image uploads:** multipart files go through `uploadImage` in `src/shared/cloudinary.ts`.
