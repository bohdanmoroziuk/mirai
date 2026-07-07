# Mirai CLI

Local CLI for generating Mirai project files.

## Status

Current version: `v0.1.0`

The CLI supports component, composable, and layer generation.

## Commands

```bash
npm run mirai -- create component <name>
npm run mirai -- create component <name> --layer <layer>
```

Creates a component in `app/components` or `layers/<layer>/app/components`.

```bash
npm run mirai -- create composable <name>
npm run mirai -- create composable <name> --layer <layer>
```

Creates a composable in `app/composables` or `layers/<layer>/app/composables`.

```bash
npm run mirai -- create layer <name>
npm run mirai -- create layer <name> --description "<description>"
```

Creates a layer with a `nuxt.config.ts` file.

## Error Handling

The CLI handles:

* validation errors
* file system errors
* Node.js errors
* unexpected errors

## Architecture

Commands are split into:

* `*.command.ts` — CLI definition
* `*.handler.ts` — command logic
* `*.schema.ts` — args validation
* `*.types.ts` — command types
* `subcommands/` — nested commands

## Structure

```txt
scripts/mirai/
  cli.ts
  commands/
    main/
      main.command.ts
      subcommands/
        create/
          create.command.ts
          subcommands/
            component/
              component.command.ts
              component.handler.ts
              component.schema.ts
              component.types.ts
            composable/
            layer/
```

## Rules

* Commands define CLI API.
* Handlers execute logic.
* Schemas validate args.
* Types describe command-specific data.
* File generation logic must be isolated from command definitions.
* Edge cases should be handled inside handlers or shared utilities.
* Do not put all logic into `cli.ts`.

## Roadmap

### v0.2.0

* Add `create feature`
* Generate feature structure with `app`, `server`, and shared files
* Add layer selection prompt
* Improve edge case handling
* Prevent accidental overwrites
* Add shared template utilities
* Add basic tests

### Later

* Add more generators
* Improve command documentation
* Consider extracting the CLI into a separate package
