# useAppIcons

`useAppIcons` provides semantic aliases for application icons.

## Purpose

Use it when a component needs an icon so icon names are defined in one shared place.

## API

```ts
function useAppIcons(): {
  back: string
  clear: string
  delete: string
  dropdown: string
  edit: string
  logout: string
  passwordHide: string
  passwordShow: string
  search: string
  tags: string
  view: string
}
```

## Usage

```vue
<script setup lang="ts">
const icons = useAppIcons()
</script>

<template>
  <UButton
    :icon="icons.search"
    aria-label="Search"
  />
</template>
```

Use semantic aliases instead of hard-coding icon names in components. Update the composable when an application-wide icon mapping changes.

## Related files

```txt
layers/20-common/app/composables/useAppIcons.ts
docs/composables/use-app-icons.md
```
