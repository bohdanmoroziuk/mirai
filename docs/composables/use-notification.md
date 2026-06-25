# useNotification

`useNotification` is a shared composable for showing app notifications.

It wraps Nuxt UI toast functionality and provides semantic methods for common notification types.

## Purpose

`useNotification` keeps toast usage consistent across the app.

Use it when the app needs to show feedback after an action, for example:

* resource created;
* resource updated;
* resource deleted;
* request failed;
* operation completed successfully.

## API

```ts
type NotificationType =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

type NotificationOptions = Omit<ToastProps, 'color'>

type UseNotificationReturn = {
  success: (options: NotificationOptions) => void
  info: (options: NotificationOptions) => void
  warning: (options: NotificationOptions) => void
  error: (options: NotificationOptions) => void
}
```

## Notification types

| Method    | Color     | Use case                  |
| --------- | --------- | ------------------------- |
| `success` | `success` | Successful actions.       |
| `info`    | `primary` | Neutral information.      |
| `warning` | `warning` | Important warnings.       |
| `error`   | `error`   | Failed actions or errors. |

## Usage

```ts
const notification = useNotification()

notification.success({
  title: 'Bookmark created',
  description: 'The bookmark has been saved successfully.',
})
```

## Error notification

```ts
const notification = useNotification()

notification.error({
  title: 'Failed to delete bookmark',
  description: 'Please try again later.',
})
```

## With mutation result

```ts
const notification = useNotification()

function handleBookmarkCreated() {
  notification.success({
    title: 'Bookmark created',
    description: 'The bookmark has been saved successfully.',
  })
}

function handleBookmarkCreateFailed() {
  notification.error({
    title: 'Failed to create bookmark',
    description: 'Please check the form and try again.',
  })
}
```

## Recommended messages

Use short and clear notification titles.

Good examples:

```txt
Bookmark created
Bookmark updated
Bookmark deleted
Failed to create bookmark
Failed to delete collection
```

Avoid vague titles:

```txt
Success
Error
Something happened
Operation failed
```

## Notes

Use `useNotification` instead of calling `useToast().add()` directly in app code.

Do not put complex business logic inside `useNotification`.

Do not use notifications for every small UI change. Use them only when the user needs clear feedback about an action.
