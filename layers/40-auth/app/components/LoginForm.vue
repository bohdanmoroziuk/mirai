<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { LoginFormState } from '@auth/app/types/auth'
import { loginFormSchema } from '@auth/app/schemas/auth.schema'

defineProps<{
  loading?: boolean
  errorMessage: Nullable<string>
}>()

const emit = defineEmits<{
  submit: [state: LoginFormState]
}>()

const getInitialState = () => {
  return {
    email: undefined,
    password: undefined,
  }
}

const state = reactive<Partial<LoginFormState>>(getInitialState())

const reset = () => {
  Object.assign(state, getInitialState())
}

const submit = (event: FormSubmitEvent<LoginFormState>) => {
  emit('submit', event.data)
}

defineExpose({
  reset,
})
</script>

<template>
  <UForm
    :schema="loginFormSchema"
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
