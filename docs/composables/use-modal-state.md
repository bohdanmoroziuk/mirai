# useModalState

`useModalState` manages the open/closed state of a modal or other dismissible UI element.

## Purpose

Use it when a component needs a reusable reactive boolean with clearly named actions for opening and closing the UI.

## API

```ts
function useModalState(initialValue?: boolean): {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
}
```

`initialValue` controls the state when the composable is created and defaults to `false`.

## Usage

```vue
<script setup lang="ts">
const { isOpen, open, close } = useModalState()
</script>

<template>
  <UButton @click="open">
    Open settings
  </UButton>

  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-4">
        <h2>Settings</h2>
        <UButton @click="close">
          Close
        </UButton>
      </div>
    </template>
  </UModal>
</template>
```

Start open when needed:

```ts
const { isOpen, close } = useModalState(true)
```

## Behavior

`isOpen` is a writable ref. Calling `open` sets it to `true`, and calling `close` sets it to `false`.

The state can also be changed by the modal component through `v-model:open`, so it stays synchronized when the user dismisses the modal through its built-in controls.

## Notes

Keep modal-specific content, validation, and business logic in the component or workflow that uses this composable. `useModalState` only manages visibility state.

Use `open` and `close` instead of toggling the ref directly when the action should communicate intent clearly.

## Related files

```txt
layers/20-common/app/composables/useModalState.ts
docs/composables/use-modal-state.md
```
