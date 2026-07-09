# Mirai Agent Instructions

## Project

Mirai is a Nuxt 4, Nuxt UI, TypeScript, MongoDB/Mongoose, Zod and TanStack Vue Query project.

Current version: v0.1.0.

Implemented scope:
- auth: signup, login, logout
- tag: create, view, search, delete
- collection: create, view
- bookmark: create, view, open link in a new tab, filter by collection id, delete

## Architecture

Follow Feature-based Vertical Slice Clean Architecture.

Feature layers live in:
- `layers/<feature>/app`
- `layers/<feature>/server`
- `layers/<feature>/shared`

Common shared code lives in:
- `layers/common/app`
- `layers/common/server`
- `layers/common/shared`

Infrastructure setup does not live in a separate `infra` layer.
Use modules instead:
- `modules/mongoose`
- `modules/vue-query`

## Local CLI

The local CLI lives in `scripts/mirai`.

`scripts/mirai` follows its own CLI architecture and file structure. Do not force the main project vertical slice structure onto the CLI.

The main CLI documentation lives in `scripts/mirai/README.md`.
In the root `README.md`, only mention that the CLI exists and which commands it supports.

Current CLI generator responsibilities:
- `create layer` generates a raw Nuxt layer only with a `nuxt.config.ts` file.
- `create feature` generates a Mirai feature slice.

The canonical generated feature folder structure contains:
- `app`
- `server`
- `shared`

Layer names are numbered by the user for now, for example `50-tag`.
Automatic layer numbering may be handled later.

## Rules

- Use pnpm.
- Core must not depend on third-party libraries.
- Do not introduce a separate `infra` layer.
- Use explicit route param names, for example `[bookmarkId].delete.ts`.
- Do not create service classes unless there is a clear need.
- Prefer simple function-based use cases.
- Keep repository ports and implementations inside the relevant feature server layer.
- Prefer `infra/mongo/{models,repositories}` for server-side persistence details.
- Use Zod schemas for API validation.
- Put `objectIdSchema` in `common/server/schemas`.
- Use `Types.ObjectId.isValid` for ObjectId validation.
- Keep composables for reusable Vue/Nuxt utilities.
- Composable filenames must use PascalCase after `use`, for example `useNotification.ts`.
- For TanStack Vue Query, split code into `keys`, `queries`, and `mutations`.
- Prefer workflows for client-side application logic.
- Query composable input params should support `MaybeRefOrGetter`.
- Do not add new production dependencies without asking first.
- Do not touch `.env`, `.env.*`, secrets, tokens, or credentials.
- Do not rewrite unrelated files.
- Keep changes small and reviewable.

## Documentation

- Document common components and common composables only.
- Endpoint documentation should be written separately for each endpoint.
- `/dev/**` pages are for local previews and development-only component demos.
- `/docs/**` files are Markdown documentation files.

## Commands

Use the package manager from the lockfile.

Before finishing code changes, run the relevant checks if available:
- typecheck
- lint
- tests
- build only when the task is broad enough to justify it

If a command fails, explain the failure and do not hide it.
