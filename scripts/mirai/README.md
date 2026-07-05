# Mirai CLI

Local CLI for generating Mirai project files.

## Current Status

Currently supported commands:

```bash
npm run mirai create component <name>
```

This command creates a component using the project conventions.

```bash
npm run mirai create composable <name>
```

This command creates a composable using the project conventions.

```bash
npm run mirai create layer <name>
```

This command creates a minimal layer directory with a nuxt.config.ts file inside it.

## Architecture

The CLI uses a command-based structure.

Each command may contain:

* `*.command.ts` — command definition
* `*.handler.ts` — command execution logic
* `*.schema.ts` — args validation
* `*.types.ts` — command-specific types
* `subcommands/` — nested commands

Command files should stay small. Business logic should live in handlers.

## File Structure

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

- [+] Add `create component`
- [+] Add `create composable`
- [+] Add `create layer`
- [ ] Add `create feature`
- [ ] Add layer args support
- [ ] Add better validation errors
- [ ] Add better filesystem error handling
- [ ] Add protection against overwriting files
- [ ] Add support for existing layer selection
- [ ] Add shared template utilities
- [ ] Add tests for generators
