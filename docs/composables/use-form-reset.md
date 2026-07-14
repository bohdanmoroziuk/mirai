# useFormReset

`useFormReset` provides a named action for resetting a form component through its template ref.

## Purpose

Use it when a parent component needs to reset a child form without knowing the form's internal state implementation.

The child form must expose a `resetState` method, typically backed by `useFormState`.

## API

```ts
type FormResetHandle = {
  resetState: () => void
}

function useFormReset(refKey: string): {
  resetForm: () => void
}
```

`refKey` is the string key used by `useTemplateRef` to locate the form component.

## Usage

Expose `resetState` from the form component:

```vue
<script setup lang="ts">
const { state, resetState } = useFormState(initialState)

defineExpose({
  resetState,
})
</script>
```

Create the reset action in the parent and use the matching template ref key:

```vue
<script setup lang="ts">
const { resetForm } = useFormReset('bookmarkForm')

function handleCreated() {
  resetForm()
}
</script>

<template>
  <BookmarkForm ref="bookmarkForm" />
  <UButton @click="resetForm">
    Reset
  </UButton>
</template>
```

The string passed to `useFormReset` must match the `ref` value exactly.

## Behavior

When `resetForm` is called, it invokes `resetState()` on the mounted form component.

The composable does not own or modify form state. Reset behavior, including how initial values are restored, remains inside the form component.

## Errors

`resetForm` throws an error when the form ref is not mounted:

```txt
Form ref "bookmarkForm" is not mounted.
```

Call `resetForm` only after the form has been mounted. This is especially important for forms rendered conditionally or inside modals.

## Notes

The child component's exposed API must include a parameterless `resetState` method. Keep the ref key stable and avoid calling `resetForm` during setup before the child is mounted.

## Related files

```txt
layers/20-common/app/composables/useFormReset.ts
layers/20-common/app/composables/useFormState.ts
docs/composables/use-form-reset.md
```
