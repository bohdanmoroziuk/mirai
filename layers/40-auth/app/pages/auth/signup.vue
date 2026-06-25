<script setup lang="ts">
import type { SignupInput } from '../../types/auth'
import { useSignupMutation } from '../../queries/auth.queries'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const notification = useNotification()
const { errorMessage, loading, signup } = useSignupMutation()

const handleSignup = async (input: SignupInput) => {
  try {
    await signup(input)
    await navigateTo('/')
  }
  catch {
    notification.error({
      title: 'Signup failed!',
      description: errorMessage.value,
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-xl font-medium mb-2">
      Create an account
    </h1>

    <div class="p-8 rounded-3xl shadow-sm">
      <SignupForm
        :loading
        :error-message
        @submit="handleSignup"
      />
    </div>

    <p class="text-sm">
      Already have an account? <ULink to="/auth/login">Log in</ULink>
    </p>
  </div>
</template>
