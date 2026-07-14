<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { LoginFormState } from '../types/auth'
import { loginFormStateSchema } from '../schemas/auth.schema'

const props = defineProps<{
  initialState: LoginFormState
  submitting?: boolean
  errorMessage: Nullable<string>
}>()

const emit = defineEmits<{
  submit: [state: LoginFormState]
}>()

const { state, resetState } = useFormState<LoginFormState>(() => props.initialState)

const submit = (event: FormSubmitEvent<LoginFormState>) => {
  emit('submit', event.data)
}

defineExpose({
  resetState,
})
</script>

<template>
  <UForm
    :schema="loginFormStateSchema"
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
      <UiInputPassword
        v-model="state.password"
        placeholder="Enter your password"
        autocomplete="current-password"
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
      Log in
    </UButton>
  </UForm>
</template>
