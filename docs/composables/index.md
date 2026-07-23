# Composables

Shared composables contain reusable app logic that can be used across pages, components and layers.

Use this folder to document project-specific composables, not every small Vue or Nuxt composable.

## Composables

| Composable | Description | Docs |
| --- | --- | --- |
| `useAppIcons` | Provides semantic aliases for application icons. | [Docs](./use-app-icons.md) |
| `useConfirmModal` | Opens `UiConfirmModal` programmatically for confirmation flows. | [Docs](./use-confirm-modal.md) |
| `useFormReset` | Resets a child form through its template ref. | [Docs](./use-form-reset.md) |
| `useFormState` | Manages typed reactive form state and reset behavior. | [Docs](./use-form-state.md) |
| `useMappedItems` | Maps nullable or reactive arrays into computed arrays. | [Docs](./use-mapped-items.md) |
| `useMappedValueOr` | Maps nullable or reactive values into computed values with a fallback. | [Docs](./use-mapped-value-or.md) |
| `useModalState` | Manages the open/closed state of a modal or other dismissible UI element. | [Docs](./use-modal-state.md) |
| `useNotification` | Shows consistent app notifications through Nuxt UI toasts. | [Docs](./use-notification.md) |

## Rules

Use shared composables when they make app behavior more consistent or remove repeated logic.

A shared composable should usually have at least one of these reasons to exist:

* it coordinates reusable UI behavior;
* it wraps Nuxt, Vue or third-party APIs with app-specific defaults;
* it hides repeated state management logic;
* it improves readability in pages and feature components;
* it standardizes how the app handles common flows.

Do not create shared composables for logic that is used only once.

## Documentation format

Each composable document should include:

* purpose;
* API;
* return value;
* usage examples;
* behavior;
* important notes;
* related components or utilities.

## Naming

Use the `use` prefix for composables:

```txt
useConfirmModal
useToggler
useSomething
```

File names should use kebab-case:

```txt
use-confirm-modal.md
```

## Related files

Composables usually live inside layer-specific `composables` directories.

Example:

```txt
layers/20-common/app/composables/useConfirmModal.ts
docs/composables/use-confirm-modal.md
```
