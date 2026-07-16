# UiConfirmModal

`UiConfirmModal` is a shared modal component for confirmation actions.

It is used when the app needs to ask the user to confirm or cancel an important action.

Common use cases:

* deleting a bookmark;
* deleting a collection;
* removing a tag;
* leaving a form with unsaved changes;
* confirming a destructive action.

## Purpose

`UiConfirmModal` keeps confirmation dialogs consistent across the app.

It should handle:

* title;
* description;
* confirm action;
* cancel action;
* loading state;
* dismissible behavior.

## Props

```ts
type UiConfirmModalProps = {
  title?: string
  description?: string
  dismissible?: boolean
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: ButtonProps['color']
  cancelColor?: ButtonProps['color']
  onConfirm?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
  onError?: (error: unknown) => Promise<void> | void
}
```

## Emits

```ts
type UiConfirmModalEmits = {
  close: [confirmed: boolean]
}
```

## Usage

```vue
<UiConfirmModal
  title="Delete bookmark?"
  description="This action cannot be undone."
  confirm-label="Delete"
  cancel-label="Cancel"
  :on-confirm="deleteBookmark"
  :on-cancel="closeModal"
/>
```

## Programmatic usage

`UiConfirmModal` is usually used through a confirmation composable.

Example:

```ts
await confirm({
  title: 'Delete bookmark?',
  description: 'This action cannot be undone.',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  async onConfirm() {
    await bookmarkRepository.remove(bookmarkId)
  },
})
```

## Behavior

The modal shows a title and optional description.

When the user clicks the confirm button, the component emits `close(true)`.

When the user clicks the cancel button, the component emits `close(false)`.

While `onConfirm` is running, the confirm button shows loading state and the cancel button is disabled.

If `onConfirm` throws, `onError` is called and the modal stays open.

When `dismissible` is `false`, the user cannot dismiss the modal through the modal backdrop or escape behavior. While confirmation is loading, the modal is also treated as non-dismissible.

## Notes

Use clear and direct titles.

Good examples:

```txt
Delete bookmark?
Delete collection?
Remove tag?
```

Avoid vague titles:

```txt
Are you sure?
Confirm action
Warning
```

For destructive actions, use a specific confirm label:

```txt
Delete
Remove
Discard
```

Do not put business logic inside `UiConfirmModal`.

Business logic should stay in the parent component, modal composable, or mutation handler.
