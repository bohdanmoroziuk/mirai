<script setup lang="ts">
import { toLoginInput } from '../../mappers/auth-input.mapper'
import { useLoginWorkflow } from '../../workflows/login.workflow'
import type { LoginFormState } from '../../types/auth'
import { getLoginFormInitialState } from '../../mappers/auth.mapper'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const loginFormInitialState = getLoginFormInitialState()

const { error, isLoggingIn, login } = useLoginWorkflow()

const errorMessage = useMappedValueOr(error, getErrorMessage, null)

const handleLogin = async (state: LoginFormState) => {
  await login(toLoginInput(state))
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-xl font-medium mb-2">
      Login to your account
    </h1>

    <div class="p-8 rounded-3xl shadow-sm">
      <LoginForm
        :initial-state="loginFormInitialState"
        :submitting="isLoggingIn"
        :error-message="errorMessage"
        @submit="handleLogin"
      />
    </div>

    <p class="text-sm">
      Don't have an account? <ULink to="/auth/signup">Sign up</ULink>
    </p>
  </div>
</template>
