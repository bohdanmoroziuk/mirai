# Mirai CLI

Local CLI for generating Mirai project files.

## Commands

```bash
npm run mirai create component <name>
```

Creates a component in app/components.

```bash
npm run mirai create component <name> --layer <layer>
```

Creates a component in layers/<layer>/app/components.

```bash
npm run mirai create composable <name>
```

Creates a composable in app/composables.

```bash
npm run mirai create composable <name> --layer <layer>
```

Creates a composable in layers/<layer>/app/composables.

```bash
npm run mirai create layer <name>
```

Creates a layer with a `nuxt.config.ts` file.

```bash
npm run mirai create layer <name> --description "<description>"
```

Creates a layer with a custom description in `nuxt.config.ts`.

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
      command.ts
      main.command.ts
      subcommands/
        create/
          command.ts
          create.command.ts
          subcommands/
            component/
              command.ts
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
- [+] Add description arg support
- [+] Ensure CLI runs only from the project root directory
- [+] Add layer argument support for components
- [+] Add layer argument support for composables
- [ ] Add better validation errors
- [ ] Add better filesystem error handling
- [ ] Add tests for generators
- [ ] Add `create feature`
- [ ] Add protection against overwriting files
- [ ] Add support for existing layer selection
- [ ] Add shared template utilities
