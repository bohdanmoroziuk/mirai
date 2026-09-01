# Mirai

> A personal command center for organizing bookmarks, tasks, notes, and everyday resources.

## v0.1.0 Scope

The goal of v0.1.0 is to provide a small but usable bookmark manager.

### Included in the UI

- Auth: sign up, log in, log out
- Tags: create, view, search, delete
- Collections: create, view
- Bookmarks: create, view, open links, filter by collection, delete

### API Support

The server routes also expose authenticated read/update/delete endpoints for tags, collections, and bookmarks where implemented:

| Area | Endpoints |
| --- | --- |
| Health | `GET /api/health` |
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |
| Tags | `GET /api/tags`, `POST /api/tags`, `PATCH /api/tags/:tagId`, `DELETE /api/tags/:tagId` |
| Collections | `GET /api/collections`, `POST /api/collections`, `GET /api/collections/:collectionId`, `PATCH /api/collections/:collectionId`, `DELETE /api/collections/:collectionId` |
| Bookmarks | `GET /api/bookmarks`, `POST /api/bookmarks`, `GET /api/bookmarks/:bookmarkId`, `PATCH /api/bookmarks/:bookmarkId`, `DELETE /api/bookmarks/:bookmarkId` |
| Cases | `GET /api/cases`, `POST /api/cases`, `GET /api/cases/:caseId`, `PATCH /api/cases/:caseId`, `DELETE /api/cases/:caseId` |

### Cases

Cases group long-running life situations such as treatment, vacations, learning, and household processes. A case owns a chronological plan of steps: completed and skipped steps remain in the history, while a step can become active only after its predecessor is finished. This change provides the authenticated CRUD API for cases and the persisted `Step` model (`pending`, `active`, `completed`, or `skipped`); step-management routes will be added with the next part of the feature.

### Not Included Yet in the UI

- Editing tags, collections, or bookmarks from the app UI
- Advanced filtering
- Bookmark import/export
- Sharing
- Browser extension

## Architecture

The project uses a layered Nuxt architecture with clear boundaries between the
application shell, shared logic, feature code, and third-party setup.

```txt
app/      → Nuxt application shell
layers/   → core, shared, and feature code
modules/  → local Nuxt modules for third-party setup
```

### Architecture evolution

#### v0.1.0: Feature-based Vertical Slice Architecture

In `v0.1.0`, Mirai follows Feature-based Vertical Slice Architecture. Each
feature owns its client, server, shared, domain, and infrastructure code, while
files inside the feature are grouped mainly by technical role.

Typical technical groups include `components`, `workflows`, `queries`,
`mappers`, `schemas`, `types`, `use-cases`, `ports`, and `infra`.

#### v0.2.0: Feature-based Flow-focused Architecture

Starting with `v0.2.0`, Mirai is incrementally adopting Feature-based
Flow-focused Architecture. The feature remains the primary ownership boundary,
but behavior is organized around explicit application flows within that
feature.

A flow represents one user or application operation, such as creating a case
or loading case statistics. Artifacts used only by that operation are grouped
together instead of being distributed across technical directories.

The end-to-end `createCase` behavior is the first completed `v0.2.0` flow. It
covers both the client and server sides of creating a case. Existing features
and operations retain the `v0.1.0` vertical-slice structure until they are
migrated deliberately.

### Flow-focused structure

Client-side flow artifacts live under the feature's `app/flows` directory:

```txt
layers/<feature>/app/flows/<flow>/
  <flow>.mapper.ts
  <flow>.mutation.ts or <flow>.query.ts
  <flow>.schema.ts
  <flow>.types.ts
  <flow>.workflow.ts
```

Server-side flow artifacts live under the feature's `server/flows` directory:

```txt
layers/<feature>/server/flows/<flow>/
  <flow>.mapper.ts
  <flow>.schema.ts
  <flow>.types.ts
  <flow>.use-case.ts
```

Only flow-specific code belongs inside a flow. Code shared by multiple flows
stays at the feature level. Examples include components, gateways, query keys,
ports, database infrastructure, shared schemas, and shared types.

The main dependency paths are:

```txt
component or page
  → workflow
  → query or mutation
  → gateway
  → API route

API route
  → flow mapper and schema
  → use case
  → port
  → infrastructure
```

Components continue to own concrete UI state such as forms and modals.
Workflows coordinate application operations, notifications, and redirects.
Routes validate transport input and delegate to flow-specific application
logic. Infrastructure remains outside flows and implements feature ports.

### Mental model

```txt
app/
  Pages, layouts, root components, and global application shell.

layers/10-core/
  Pure framework-agnostic TypeScript code.
  Must not depend on Nuxt, Vue, H3, Zod, Mongoose, or other libraries.

layers/20-common/
  Reusable application code that may depend on Nuxt, Vue, H3, Zod, Nuxt UI, and other libraries.

layers/30-user/
layers/40-auth/
layers/50-tag/
layers/60-collection/
layers/70-bookmark/
layers/80-case/
  Feature layers.
  Each feature owns its flows, UI, routes, domain, and infrastructure.
  Starting with v0.2.0, new behavior is grouped around explicit flows.

modules/
  Local Nuxt modules used to install and configure third-party tools.
  Examples include Vue Query and Mongoose.
```

### Rules

```txt
Pure reusable TypeScript logic
→ layers/10-core

Reusable Nuxt/Vue/server/app logic
→ layers/20-common

Feature-specific logic
→ corresponding feature layer

Third-party setup and integration
→ modules

Pages, layouts, and app shell
→ app
```

### Dependency direction

```txt
core    → depends on nothing project-specific
common  → may depend on core and framework/library code
features → may depend on core and common
modules → configure third-party tools for the Nuxt runtime
```

Feature layers should own their domain implementation. Models, repositories, mappers, services, schemas, and routes stay inside the corresponding feature layer.

Server-side persistence details live inside the relevant feature layer under `server/infra/mongo`.

## API Documentation

The project uses Nitro OpenAPI integration to generate API documentation for server routes.

Available documentation links in development:

* OpenAPI JSON: [`http://localhost:3000/_openapi.json`](http://localhost:3000/_openapi.json)
* Scalar UI: [`http://localhost:3000/_scalar`](http://localhost:3000/_scalar)
* Swagger UI: [`http://localhost:3000/_swagger`](http://localhost:3000/_swagger)


## Development pages and documentation

The project contains two separate places for internal development materials:

```txt
/dev/**
/docs/**
```

### `/dev/**` pages

`/dev/**` pages are development-only Nuxt pages used to preview internal UI components and app states.

Example routes:

```txt
/dev/components
/dev/components/ui-query-state
/dev/components/ui-input-password
/dev/components/ui-loader
```

Use these pages to manually check component states, layout behavior and visual consistency during development.

Dev pages should be marked with the `devOnly` page meta:

```ts
definePageMeta({
  devOnly: true,
})
```

The `dev-only.global` middleware checks this meta field and blocks these pages outside development mode.

### `/docs/**` files

`/docs/**` files contain internal project documentation.

Example files:

```txt
docs/components/index.md
docs/components/ui-query-state.md
docs/components/ui-input-password.md
docs/components/ui-loader.md
docs/composables/index.md
docs/composables/use-notification.md
```

Use these files to document shared components, architecture decisions, API conventions and project-specific rules.

Component documentation should usually include:

* purpose;
* props;
* emits;
* slots;
* usage examples;
* important notes;
* related dev preview route.

### Rule

Use `/dev/**` for interactive previews.

Use `/docs/**` for written documentation.

## Local CLI

Mirai includes a local CLI for generating project files.

Current version: `v0.1.0`

```bash
pnpm mirai create component <name>
pnpm mirai create component <name> --layer <layer>

pnpm mirai create composable <name>
pnpm mirai create composable <name> --layer <layer>

pnpm mirai create layer <name>
pnpm mirai create layer <name> --description "<description>"
```

The CLI handles validation, file system, Node.js, and unexpected errors gracefully.

Source code is located in `scripts/mirai/`.

See `scripts/mirai/README.md` for architecture, command details, and roadmap.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

The project uses `pnpm@11.10.0` from `package.json`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Troubleshooting

### Nuxt cannot find an auto-imported name

If the editor or type checker reports `Cannot find name '<name>'` for a
symbol exported from a configured auto-import directory, the generated Nuxt
types may be stale. This commonly happens when a new file or export is added
while the development server is not running.

Regenerate the Nuxt types from the project root:

```bash
pnpm exec nuxt prepare
```

If the error remains visible, restart the development server and reload the
editor's Vue or TypeScript language service. Do not edit files inside `.nuxt`
manually because Nuxt regenerates that directory.

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
