<script setup lang="ts">
import type { LoginFormState } from '@auth/app/types/auth'

defineProps<{
  loading?: boolean
  errorMessage: Nullable<string>
}>()

const emit = defineEmits<{
  submit: [state: LoginFormState]
}>()

const getInitialState = () => {
  return {
    email: '',
    password: '',
  }
}

const state = reactive<LoginFormState>(getInitialState())

const reset = () => {
  Object.assign(state, getInitialState())
}

const submit = () => {
  emit('submit', state)
}

defineExpose({
  reset,
})
</script>

<template>
  <UForm
    :state="state"
    class="space-y-4"
    @submit="submit"
  >
    <UFormField
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        class="w-full"
        type="email"
        placeholder="Enter your email"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        class="w-full"
        placeholder="Enter your password"
        type="password"
      />
    </UFormField>

    <p
      v-if="errorMessage"
      class="text-error text-center"
    >
      {{ errorMessage }}
    </p>

    <UButton
      :loading="loading"
      type="submit"
      block
    >
      Log in
    </UButton>
  </UForm>
</template>
