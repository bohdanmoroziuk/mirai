<script setup lang="ts">
import { useLoginMutation } from '../../queries/auth.queries'
import { toLoginInput } from '../../mappers/auth-input.mapper'
import type { LoginFormState } from '../../types/auth'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const notification = useNotification()
const { errorMessage, loading, login } = useLoginMutation()

const handleLogin = async (state: LoginFormState) => {
  try {
    await login(toLoginInput(state))
    await navigateTo('/')
  }
  catch {
    notification.error({
      title: 'Login failed!',
      description: errorMessage.value,
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-xl font-medium mb-2">
      Login to your account
    </h1>

    <div class="p-8 rounded-3xl shadow-sm">
      <LoginForm
        :loading
        :error-message
        @submit="handleLogin"
      />
    </div>

    <p class="text-sm">
      Don't have an account? <ULink to="/auth/signup">Sign up</ULink>
    </p>
  </div>
</template>
