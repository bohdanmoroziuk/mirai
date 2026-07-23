# Mirai CLI

## Scope

* Keep CLI-specific changes inside `scripts/mirai` unless the task explicitly requires changes elsewhere.
* Do not modify the main Mirai application merely to simplify CLI implementation or testing.
* Keep changes limited to the requested command, generator, utility, or test.
* Follow the existing CLI directory structure and nearby implementation patterns.
* Preserve existing command arguments, generated output, and error behavior unless the task explicitly changes them.

## Design

* Keep commands small and focused.
* Separate command registration and argument handling from reusable generation logic when the existing structure supports it.
* Organize generation logic by entity type, such as `component`, `composable`, and `layer`.
* Reuse existing filesystem, path, validation, and naming utilities before adding new ones.
* Prefer direct functions and plain objects over classes or factories that provide no practical benefit.
* Avoid introducing abstractions until at least two concrete cases clearly benefit from them.
* Keep framework-independent logic separate from terminal output and process control where practical.

## Command Arguments

* Validate command arguments with Zod.
* Use explicit schema names based on the command, for example:

```ts
createComponentArgsSchema
createComposableArgsSchema
createLayerArgsSchema
```

* Keep validation close to the command or feature that owns the arguments.
* Return clear validation messages that identify the invalid argument and expected value.
* Do not duplicate validation already handled by an existing shared schema or parser.

## File Generation

* Resolve and validate destination paths before writing files.
* Follow existing project naming and directory conventions.
* Generate the smallest required set of files.
* Do not overwrite existing files unless overwrite behavior is explicitly requested and supported.
* Detect conflicts before writing when possible.
* Avoid leaving partially generated output after a failure.
* Keep templates deterministic and easy to inspect.
* Do not add speculative files, exports, or boilerplate beyond the requested generator behavior.

## Errors

* Use the existing CLI error classes and error-handling conventions.
* Keep user-facing error messages concise and actionable.
* Preserve the original error as a cause when it provides useful diagnostic context.
* Do not catch an error only to throw the same error again.
* Handle errors at the highest appropriate boundary rather than duplicating handling in every subcommand.
* Do not terminate the process from reusable generation or utility functions.

## Testing

* Use Vitest.
* Follow the naming and placement conventions of existing CLI tests.
* Test observable command behavior rather than internal implementation details.
* Use isolated temporary directories for tests that generate or modify files.
* Never write generated test output into the actual Mirai repository structure.
* Clean up temporary files and directories after each test, including failed tests.
* Avoid depending on the developer’s current working files, global configuration, or machine-specific state.
* Prefer real temporary filesystem operations over extensive filesystem mocking when they make the test clearer and more reliable.

Cover the following scenarios when relevant:

* successful generation;
* generated path, filename, and content;
* optional arguments and default values;
* invalid or missing arguments;
* invalid destination paths;
* existing-file conflicts;
* unsupported execution context;
* filesystem failures;
* absence of unrelated generated files.

Do not add every possible edge case mechanically. Prioritize behavior that protects user files and command contracts.

## Test Workflow

When adding or changing tests:

1. Inspect the command and its direct dependencies.
2. Inspect existing CLI tests and Vitest configuration.
3. Add tests for one command or behavior at a time.
4. Run the affected test file first.
5. Run the complete Mirai CLI test suite.
6. Run type checking when command contracts, schemas, or shared types change.
7. Review the final diff for production changes introduced only to satisfy tests.

Prefer these project scripts when available:

```bash
pnpm test:unit:cli
pnpm test:unit:cli:watch
```

Do not use watch mode as the final verification step.

## Production Changes During Testing

* Do not refactor production code merely to make a test easier to write.
* Make a production change only when it fixes a real defect, creates a necessary testing boundary, or is explicitly part of the task.
* Report useful production refactors separately under `Suggested Improvements`.
* Report defects discovered while testing separately under `Suggested Fixes`.
* Do not implement those additional findings without approval.

## Documentation

Update CLI documentation when changing:

* command names;
* arguments or options;
* generated file structure;
* validation behavior;
* usage examples;
* required execution context.

Keep examples executable and aligned with the actual command interface.

## Verification

For CLI changes, run the smallest relevant checks first.

Typical verification:

```bash
pnpm test:unit:cli
pnpm typecheck
pnpm lint
```

Run only commands that exist in the repository’s `package.json`.

At completion, report:

* the changed CLI behavior;
* tests added or updated;
* verification commands and results;
* checks that could not be completed;
* suggested fixes or improvements that were intentionally left unimplemented.
