# useConfirmModal

`useConfirmModal` is a shared composable for opening confirmation modals programmatically.

It uses the `UiConfirmModal` component internally.

Related links:

* [`UiConfirmModal` docs](../components/ui-confirm-modal.md)
* `UiConfirmModal` dev preview: `/dev/components/ui-confirm-modal`

## Purpose

`useConfirmModal` keeps confirmation flows consistent across the app.

Use it when a user needs to confirm an important action before it is executed.

Common use cases:

* deleting a bookmark;
* deleting a collection;
* removing a tag;
* discarding unsaved changes;
* confirming a destructive action.

## API

```ts
type ConfirmModalOptions = {
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

type UseConfirmModalReturn = {
  confirm: (options: ConfirmModalOptions) => Promise<boolean>
}
```

## Usage

```ts
const { confirm } = useConfirmModal()

async function handleDeleteBookmark(bookmarkId: string) {
  await confirm({
    title: 'Delete bookmark?',
    description: 'This action cannot be undone.',
    confirmLabel: 'Delete',
    async onConfirm() {
      await deleteBookmark(bookmarkId)
    },
  })
}
```

## With error handling

```ts
const notification = useNotification()
const { confirm } = useConfirmModal()

async function handleDeleteBookmark(bookmarkId: string) {
  await confirm({
    title: 'Delete bookmark?',
    description: 'This action cannot be undone.',
    confirmLabel: 'Delete',

    async onConfirm() {
      await deleteBookmark(bookmarkId)
    },

    onError(error) {
      notification.error({
        title: 'Failed to delete bookmark',
        description: getErrorMessage(error),
      })
    },
  })
}
```

## Behavior

`useConfirmModal` opens `UiConfirmModal` through Nuxt UI overlay functionality.

When the user confirms the action:

1. `UiConfirmModal` calls `onConfirm`;
2. the modal enters loading state while `onConfirm` is running;
3. the modal closes and `confirm` resolves to `true` after successful confirmation;
4. if `onConfirm` throws, `onError` is called and the modal stays open.

When the user cancels the action:

1. `UiConfirmModal` calls `onCancel` if it exists;
2. the modal closes and `confirm` resolves to `false`.

## Notes

Use clear and specific titles.

Good examples:

```txt
Delete bookmark?
Delete collection?
Remove tag?
Discard changes?
```

Avoid vague titles:

```txt
Are you sure?
Confirm action
Warning
```

Prefer specific confirm labels for destructive actions:

```txt
Delete
Remove
Discard
```

Do not put business rules inside `UiConfirmModal`.

Business logic should stay in the caller:

* page component;
* feature component;
* workflow;
* mutation handler.

`useConfirmModal` should only coordinate the confirmation UI flow.
