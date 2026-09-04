# UiQueryState

`UiQueryState` is a shared component for rendering common server-state UI states.

It handles:

* fetching state;
* error state;
* empty state;
* success state.

Use it with TanStack Query results or any similar server-state source.

## Purpose

`UiQueryState` keeps query state rendering consistent across the app.

It does not fetch data by itself. It only receives already prepared state:

* `data`;
* `error`;
* `fetching`;
* `emptyWhen` when an empty state is needed.

## Props

```ts
type UiQueryStateProps<T, E extends Error = Error> = {
  data?: T
  error?: E | null
  fetching?: boolean
  emptyWhen?: (data?: T) => boolean
}
```

## Slots

| Slot       | Props          | Purpose                                                               | Default content                    |
| ---------- | -------------- | --------------------------------------------------------------------- | ---------------------------------- |
| `fetching` | —              | Rendered while data is being fetched.                                 | Centered `UiLoader`.               |
| `error`    | `{ error: E }` | Rendered when an error exists.                                        | Centered error message.            |
| `empty`    | —              | Rendered when `emptyWhen(data)` returns `true`, when provided.         | Centered muted `No data.` message. |
| `default`  | `{ data: T }`  | Rendered when data exists and there is no fetching/error/empty state. | None.                              |

## Behavior

`UiQueryState` renders states in this order:

1. `fetching`
2. `error`
3. `empty` when `emptyWhen` returns `true`
4. `default`

This means fetching has the highest priority.

The `fetching`, `error` and `empty` slots provide default content. Define any of
these slots only when the screen needs a custom state. Because the error fallback
renders `error.message`, the error type must extend `Error`.

## Basic usage

```vue
<UiQueryState
  :data="bookmarks"
  :error="error"
  :fetching="fetching"
  :empty-when="(bookmarks) => !bookmarks?.length"
>
  <template #default="{ data: bookmarks }">
    <BookmarkList :bookmarks="bookmarks" />
  </template>
</UiQueryState>
```

While the query is fetching, the component renders `UiLoader`. Errors render
their message, and an empty result renders `No data.`.

## Custom state content

Override the fallback for any state by defining its slot:

```vue
<UiQueryState
  :data="bookmarks"
  :error="error"
  :fetching="fetching"
  :empty-when="(bookmarks) => !bookmarks?.length"
>
  <template #fetching>
    Loading bookmarks...
  </template>

  <template #error="{ error }">
    Could not load bookmarks: {{ error.message }}
  </template>

  <template #empty>
    No bookmarks yet.
  </template>

  <template #default="{ data: bookmarks }">
    <BookmarkList :bookmarks="bookmarks" />
  </template>
</UiQueryState>
```

When no `emptyWhen` function is provided, the component skips the empty state and renders the default slot after fetching and error handling:

```vue
<UiQueryState
  :error="error"
  :fetching="isFetching"
>
  <template #default>
    <BookmarkForm :initial-state="initialState" />
  </template>
</UiQueryState>
```

## TanStack Query usage

```vue
<script setup lang="ts">
const {
  data: bookmarks,
  error,
  isFetching,
} = useQuery({
  queryKey: ['bookmarks'],
  queryFn: () => bookmarkRepository.getMany(),
})
</script>

<template>
  <UiQueryState
    :data="bookmarks"
    :error="error"
    :fetching="isFetching"
    :empty-when="(bookmarks) => !bookmarks?.length"
  >
    <template #default="{ data: bookmarks }">
      <BookmarkList :bookmarks="bookmarks" />
    </template>
  </UiQueryState>
</template>
```

## Notes

Use `UiQueryState` for server-state UI.

Do not use it for simple local state.

Good use cases:

* bookmarks list;
* collections list;
* tags list;
* search results;
* user-owned resources loaded from the API.

Avoid putting data fetching logic inside `UiQueryState`.

Fetching, mapping, selecting and error handling should stay in queries, composables or page components.
