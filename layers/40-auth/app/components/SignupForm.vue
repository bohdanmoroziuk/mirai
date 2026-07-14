<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { SignupFormState } from '../types/auth'
import { signupFormStateSchema } from '../schemas/auth.schema'

const props = defineProps<{
  initialState: SignupFormState
  submitting?: boolean
  errorMessage: Nullable<string>
}>()

const emit = defineEmits<{
  submit: [state: SignupFormState]
}>()

const state = reactive<SignupFormState>({ ...props.initialState })

const reset = () => {
  Object.assign(state, { ...props.initialState })
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
    :schema="signupFormStateSchema"
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
      <UiInputPassword
        v-model="state.password"
        placeholder="Enter your password"
        autocomplete="new-password"
        class="w-full"
      />
    </UFormField>

    <p
      v-if="errorMessage"
      class="text-error text-center"
    >
      {{ errorMessage }}
    </p>

    <UButton
      :loading="submitting"
      type="submit"
      block
    >
      Sign up
    </UButton>
  </UForm>
</template>
