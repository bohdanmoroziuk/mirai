<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { SignupFormState } from '../types/auth'
import { signupFormSchema } from '../schemas/auth.schema'

defineProps<{
  loading?: boolean
  errorMessage: Nullable<string>
}>()

const emit = defineEmits<{
  submit: [state: SignupFormState]
}>()

const getInitialState = () => {
  return {
    name: undefined,
    email: undefined,
    password: undefined,
  }
}

const state = reactive<Partial<SignupFormState>>(getInitialState())

const reset = () => {
  Object.assign(state, getInitialState())
}

const submit = (event: FormSubmitEvent<SignupFormState>) => {
  emit('submit', event.data)
}

defineExpose({
  reset,
})
</script>

<template>
  <UForm
    :schema="signupFormSchema"
    :state="state"
    class="space-y-4"
    @submit="submit"
  >
    <UFormField
      label="Name"
      name="name"
    >
      <UInput
        v-model="state.name"
        class="w-full"
        type="text"
        placeholder="Enter your name"
      />
    </UFormField>

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
      Sign up
    </UButton>
  </UForm>
</template>
