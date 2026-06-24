## UiInputPassword

`UiInputPassword` is a shared password input component.

It wraps Nuxt UI input behavior and adds password visibility toggling.

Use it when a form needs a password-like field:

* login password
* signup password
* password confirmation
* current password
* new password

### Purpose

`UiInputPassword` keeps password input behavior consistent across the app.

It should handle:

* password value binding
* show/hide password toggle
* disabled state
* placeholder
* autocomplete value
* invalid state from the parent form

### Props

```ts
type UiInputPasswordProps = {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  autocomplete?: string
}
```

### Emits

```ts
type UiInputPasswordEmits = {
  'update:modelValue': [value: string]
}
```

### Usage

```vue
<script setup lang="ts">
const password = ref('')
</script>

<template>
  <UiInputPassword
    v-model="password"
    placeholder="Enter your password"
    autocomplete="current-password"
  />
</template>
```

### With Nuxt UI form field

```vue
<UFormField
  label="Password"
  name="password"
>
  <UiInputPassword
    v-model="state.password"
    placeholder="Enter your password"
    autocomplete="current-password"
  />
</UFormField>
```

### Signup example

```vue
<UFormField
  label="Password"
  name="password"
>
  <UiInputPassword
    v-model="state.password"
    placeholder="Create a password"
    autocomplete="new-password"
  />
</UFormField>

<UFormField
  label="Confirm password"
  name="passwordConfirmation"
>
  <UiInputPassword
    v-model="state.passwordConfirmation"
    placeholder="Confirm your password"
    autocomplete="new-password"
  />
</UFormField>
```

### Behavior

By default, the input type is `password`.

When the visibility button is clicked, the input type changes to `text`.

Clicking the button again changes it back to `password`.

### Notes

Use `autocomplete="current-password"` for login forms.

Use `autocomplete="new-password"` for signup, password reset and password confirmation forms.

Do not put validation logic inside `UiInputPassword`.

Validation should stay in the form schema or parent form component.
