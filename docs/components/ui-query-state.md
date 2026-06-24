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
* `emptyWhen`.

## Props

```ts
type UiQueryStateProps<T, E = Error> = {
  data?: T
  error?: E | null
  fetching?: boolean
  emptyWhen: (data?: T) => boolean
}
```

## Slots

| Slot       | Props          | Purpose                                                               |
| ---------- | -------------- | --------------------------------------------------------------------- |
| `fetching` | —              | Rendered while data is being fetched.                                 |
| `error`    | `{ error: E }` | Rendered when an error exists.                                        |
| `empty`    | —              | Rendered when `emptyWhen(data)` returns `true`.                       |
| `default`  | `{ data?: T }` | Rendered when data exists and there is no fetching/error/empty state. |

## Behavior

`UiQueryState` renders states in this order:

1. `fetching`
2. `error`
3. `empty`
4. `default`

This means fetching has the highest priority.

## Basic usage

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
    {{ error.message }}
  </template>

  <template #empty>
    No bookmarks yet.
  </template>

  <template #default="{ data: bookmarks }">
    <BookmarkList :bookmarks="bookmarks" />
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
    <template #fetching>
      Loading bookmarks...
    </template>

    <template #error="{ error }">
      {{ error.message }}
    </template>

    <template #empty>
      No bookmarks yet.
    </template>

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
