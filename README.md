# Mirai

> A personal command center for organizing bookmarks, tasks, notes, and everyday resources.


## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

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
