# Mirai

## Project Overview

Mirai is a Nuxt 4 full-stack application with a local project CLI located in `scripts/mirai`.

Main technologies include:

* Nuxt 4
* Vue 3
* TypeScript
* Nuxt UI
* TanStack Vue Query
* MongoDB and Mongoose
* Zod
* Vitest

Inspect the existing implementation and nearby files before introducing a new pattern.

## Package Manager

* Use pnpm for all dependency and package script commands.
* Use existing scripts from `package.json`.
* Do not modify `pnpm-lock.yaml` unless dependencies change.
* Do not add, update, replace, or remove dependencies without approval.
* Do not use npm or Yarn commands.

## Scope

* Keep changes to the main application and Mirai CLI separate unless the task explicitly requires both.
* Application code belongs outside `scripts/mirai`.
* CLI-specific code belongs inside `scripts/mirai`.
* Do not move code between the application and CLI merely to reduce duplication.
* Follow any nested `AGENTS.md` instructions for the active directory.

## Architecture

Mirai follows a feature-based vertical slice architecture with Clean Architecture boundaries where they provide practical value.

### Features

Feature code lives under:

```text
layers/<feature>/
```

A feature may contain:

```text
app/
server/
shared/
```

* `app` contains client-side application and UI integration logic.
* `server` contains server-side application, domain, and infrastructure logic.
* `shared` contains types, constants, schemas, and utilities shared between the feature’s `app` and `server` code.

Keep feature-specific code inside its feature layer unless it is genuinely reusable across multiple features.

### Core

`core` contains technology-independent primitives.

* Do not import third-party libraries into `core`.
* Do not place framework-specific, database-specific, or feature-specific logic in `core`.

### Common

`common` contains reusable code shared by multiple features.

* `common` may depend on third-party libraries when appropriate.
* Do not move feature-specific code into `common` prematurely.
* Prefer duplication inside one feature over an abstraction with no proven cross-feature use.

### Modules

Third-party library setup and application-level integrations belong in `modules`.

Examples include:

* Mongoose setup;
* TanStack Vue Query setup;
* logging integrations;
* other framework or library configuration.

Do not create a root-level `infra` layer.

## Frontend Conventions

### Workflows

Client-side application operations belong in feature `workflows`.

Workflows may:

* coordinate queries and mutations;
* show notifications;
* perform redirects;
* coordinate application-level actions.

Workflows must not directly control concrete component UI state such as:

* opening or closing modals;
* resetting forms;
* managing local component state;
* calling confirmation-modal composables.

Components or container components should own these UI concerns.

### Composables

Use `composables` for reusable Vue or Nuxt behavior rather than feature application operations.

Composable filenames use PascalCase after the `use` prefix:

```text
useNotification.ts
usePendingIds.ts
useFormState.ts
```

### Inputs and Forms

* Keep form state and initial values inside the component.
* Map UI form state to an application input before calling a workflow.
* Workflows should accept application input types, not component form-state types.
* Prefer explicit mapper functions such as `toCreateBookmarkInput`.

### TanStack Vue Query

Split feature query code into:

```text
<feature>.keys.ts
<feature>.queries.ts
<feature>.mutations.ts
```

Use `MaybeRefOrGetter` for query-composable inputs when values may be reactive.

Reuse the existing query-key factory conventions.

## Server Conventions

### Use Cases

* Place server application operations in `use-cases`.
* Prefer focused functions over service classes when an object provides no practical benefit.
* Keep transport and framework details outside use cases.

### Ports and Infrastructure

* Define repository ports separately from their concrete implementations.
* Place concrete implementations under technology-specific directories.

Example:

```text
server/
  ports/
  use-cases/
  infra/
    mongo/
      models/
      repositories/
```

Do not expose Mongoose, Prisma, database documents, or framework-specific types through application boundaries.

### Dependency Wiring

Use `<feature>.container.ts` to wire dependencies.

Prefer exporting ready-to-use use cases:

```ts
export const createBookmark = createBookmarkUseCase({
  bookmarkRepository,
})
```

Avoid container factory functions unless runtime or test reconfiguration requires them.

### Server Routes

* Keep server routes thin.
* Validate external input with Zod.
* Map route input to use-case input through explicit mapper functions.
* Use reusable guards for repeated resource checks.
* Use explicit route parameter names.

Prefer:

```text
[bookmarkId].delete.ts
```

over:

```text
[id].delete.ts
```

## General Code Conventions

* Follow the naming, structure, and style of nearby files.
* Reuse existing utilities before introducing new abstractions.
* Prefer explicit, readable code over clever or overly generic solutions.
* Apply design patterns only when they solve a concrete problem.
* Preserve existing public contracts unless changing them is part of the task.
* Avoid broad formatting changes or unrelated cleanup.
* Update relevant documentation when changing architecture, public APIs, commands, or established conventions.
* Document every newly added utility with JSDoc, including its purpose, parameters, and return value where applicable.

## Verification

Use the smallest relevant verification first.

After application changes, run the applicable commands from `package.json`, typically:

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
```

For a focused test, run the relevant test file or project before the complete test suite.

After changes that affect both the application and CLI, verify them separately.

Always:

* inspect the final Git diff;
* check for unrelated changes;
* report which commands were run;
* report failures or checks that could not be completed;
* do not fix unrelated pre-existing failures without approval.
