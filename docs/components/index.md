# Shared Components

Shared components are small reusable UI components used across the app.

Most basic UI primitives come from Nuxt UI, so this folder should document only project-specific components that add app-level behavior, structure, or conventions.

## Components

| Component           | Description                               | Docs                           | Dev preview                         |
| ------------------- | ----------------------------------------- | ------------------------------ | ----------------------------------- |
| `UiInputPassword`   | Password input with visibility toggling.  | [Docs](./ui-input-password.md) | `/dev/components/ui-input-password` |
| `UiQueryState` | Handles fetching, error, empty and success states for server-state data. | [Docs](./ui-query-state.md) | `/dev/components/ui-query-state` |

## Rules

Use shared components when they make app behavior more consistent.

Do not create shared components for every small UI element. Prefer Nuxt UI components directly when no app-specific behavior is needed.

A shared component should usually have at least one of these reasons to exist:

* it hides repeated markup;
* it standardizes behavior;
* it standardizes visual states;
* it wraps Nuxt UI with app-specific defaults;
* it improves readability in pages and feature components.

## Documentation format

Each component document should include:

* purpose;
* when to use it;
* props;
* emits;
* slots;
* examples;
* important notes.

## Dev previews

Development previews live under:

```txt
/dev/components
```

Each shared component should have its own preview page:

```txt
/dev/components/ui-input-password
```

Preview pages should show the main states of a component, for example:

* default state;
* loading state;
* error state;
* empty state;
* disabled state;
* invalid state.

Not every component needs all states. Show only the states that make sense for the component.
