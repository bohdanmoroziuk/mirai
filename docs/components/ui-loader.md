# UiLoader

`UiLoader` is a shared component for rendering a simple loading spinner.

It does not accept any props and does not emit any events.

## Purpose

`UiLoader` keeps loading indicators consistent across the app.

Use it when a component needs to show that some async action or data fetching is in progress.

## Props

`UiLoader` does not accept props.

## Emits

`UiLoader` does not emit events.

## Slots

`UiLoader` does not provide slots.

## Usage

```vue
<UiLoader />
```

## With UiQueryState

```vue
<UiQueryState
  :data="bookmarks"
  :error="error"
  :fetching="isFetching"
  :empty-when="(bookmarks) => !bookmarks?.length"
>
  <template #fetching>
    <UiLoader />
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

## Notes

Use `UiLoader` for simple loading states.

Do not add data fetching logic to `UiLoader`.

Do not use it for full-page loading screens if that screen needs custom layout, text, or actions.
